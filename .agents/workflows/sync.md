---
description: 리포지토리 원격 동기화 (Remote Sync/Push)
---

# Sync Workflow
이 워크플로우는 로컬 저장소의 깃(Git) 커밋 내역을 원격 리포지토리(Remote Repository)에 업로드(Push) 하거나 최신 변경사항을 다운로드할 때(Pull) 사용합니다.

1. 현재 로컬 상태와 브랜치 확인 (`git status`)
2. 원격 변경사항 반영하기 (`git pull --rebase` 등 상황에 맞게)
3. 로컬 커밋 내역을 원격에 올리기 (`git push`)
4. "이 워크플로우는 사용자의 명확한 지시 하에만 진행해야 합니다."
