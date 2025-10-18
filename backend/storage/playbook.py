import json
from pathlib import Path
from datetime import datetime

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)
PLAYBOOK_DIR = DATA_DIR / "playbooks"
PLAYBOOK_DIR.mkdir(exist_ok=True)


class PlaybookStorage:
    """File-based storage for user playbooks"""

    @staticmethod
    def get_playbook_path(user_id: str) -> Path:
        """Get file path for user's playbook"""
        return PLAYBOOK_DIR / f"{user_id}.json"

    @staticmethod
    def save_playbook(user_id: str, content: str) -> dict:
        """Save user's playbook to file"""
        try:
            path = PlaybookStorage.get_playbook_path(user_id)
            data = {
                "user_id": user_id,
                "content": content,
                "updated_at": datetime.now().isoformat(),
            }

            with open(path, "w") as f:
                json.dump(data, f, indent=2)

            return {"status": "success", "message": "Playbook saved"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    @staticmethod
    def get_playbook(user_id: str) -> dict:
        """Retrieve user's playbook from file"""
        try:
            path = PlaybookStorage.get_playbook_path(user_id)

            if not path.exists():
                return {"user_id": user_id, "content": "", "exists": False}

            with open(path, "r") as f:
                data = json.load(f)

            return {**data, "exists": True}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    @staticmethod
    def delete_playbook(user_id: str) -> dict:
        """Delete user's playbook"""
        try:
            path = PlaybookStorage.get_playbook_path(user_id)

            if path.exists():
                path.unlink()
                return {"status": "success", "message": "Playbook deleted"}

            return {"status": "error", "message": "Playbook not found"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
