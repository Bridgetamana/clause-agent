import os
from jose import JWTError, jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer

security = HTTPBearer()
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = os.getenv("AUTH0_CLIENT_ID")
AUTH0_ALGORITHM = "RS256"

_auth0_keys = None


async def get_auth0_public_keys():
    """Fetch Auth0 public keys for token verification"""
    global _auth0_keys
    if _auth0_keys is None:
        import httpx
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
            _auth0_keys = response.json()
    return _auth0_keys


async def verify_token(credentials=Depends(security)) -> dict:
    """Verify Auth0 JWT token and return decoded payload"""
    token = credentials.credentials

    try:
        keys = await get_auth0_public_keys()
        unverified_header = jwt.get_unverified_header(token)
        key_id = unverified_header.get("kid")

        if not key_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        signing_key = None
        for key in keys["keys"]:
            if key["kid"] == key_id:
                signing_key = key
                break

        if not signing_key:
            raise HTTPException(status_code=401, detail="Key not found")

        from jose.backends.rsa_backend import RSAKey
        public_key = RSAKey.from_jwk(signing_key)

        payload = jwt.decode(
            token,
            public_key.public_key_pem,
            algorithms=[AUTH0_ALGORITHM],
            audience=AUTH0_CLIENT_ID,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )

        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=401, detail="Authentication failed")


async def get_current_user(payload: dict = Depends(verify_token)) -> str:
    """Extract user ID from verified token"""
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found")
    return user_id
