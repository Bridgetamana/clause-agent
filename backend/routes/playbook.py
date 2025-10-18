from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from middleware.auth import get_current_user
from storage.playbook import PlaybookStorage

router = APIRouter()


class PlaybookRequest(BaseModel):
    content: str


@router.post("/save")
async def save_playbook(request: PlaybookRequest, user_id: str = Depends(get_current_user)):
    """Save user's playbook"""
    if not request.content or len(request.content.strip()) == 0:
        raise HTTPException(status_code=400, detail="Playbook content cannot be empty")

    result = PlaybookStorage.save_playbook(user_id, request.content)

    if result.get("status") == "error":
        raise HTTPException(status_code=500, detail=result.get("message"))

    return {"user_id": user_id, "content": request.content, "message": "Saved"}


@router.get("/get")
async def get_playbook(user_id: str = Depends(get_current_user)):
    """Retrieve user's playbook"""
    result = PlaybookStorage.get_playbook(user_id)

    if result.get("status") == "error":
        raise HTTPException(status_code=500, detail=result.get("message"))

    return result


@router.delete("/delete")
async def delete_playbook(user_id: str = Depends(get_current_user)):
    """Delete user's playbook"""
    result = PlaybookStorage.delete_playbook(user_id)

    if result.get("status") == "error":
        raise HTTPException(status_code=400, detail=result.get("message"))

    return result
