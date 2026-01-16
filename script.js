// 탭 전환 기능
function switchTab(tabName) {
    // 모든 탭 버튼과 패널에서 active 클래스 제거
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach((button) => button.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    // 선택된 탭 활성화
    const selectedButton = event.target;
    const selectedPanel = document.getElementById(tabName + "-tab");

    selectedButton.classList.add("active");
    selectedPanel.classList.add("active");
}

// 연락처 저장 기능 (vCard 형식)
function saveContact() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:양희수
N:양;희수;;;
ORG:도룡미소부동산
TITLE:대표
TEL;TYPE=CELL:010-2270-3008
EMAIL:bizup@bizup.com
ADR;TYPE=WORK:;;대한민국;도룡동;유성구;;대전
URL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "도룡미소부동산_양희수_대표.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("연락처가 다운로드되었습니다!");
}

// 공유하기 기능 - 모달 열기
function shareCard() {
    document.getElementById("shareModal").style.display = "flex";
}

// 모달 닫기
function closeShareModal() {
    document.getElementById("shareModal").style.display = "none";
}

// 모달 외부 클릭시 닫기
window.onclick = function (event) {
    const modal = document.getElementById("shareModal");
    if (event.target === modal) {
        closeShareModal();
    }
};

// 카카오톡 공유
function shareKakao() {
    const shareUrl = "https://jongyoun3128.github.io/basic/";
    const text = "양희수 디지털 명함";
    const message = `${text}\n${shareUrl}`;

    // 모바일에서 Web Share API 사용 (카카오톡 포함)
    if (navigator.share) {
        navigator
            .share({
                title: text,
                text: text,
                url: shareUrl,
            })
            .then(() => {
                console.log("공유 성공");
                closeShareModal();
            })
            .catch((error) => {
                console.log("공유 취소 또는 실패:", error);
                // Web Share 실패시 카카오톡 URL 스킴 사용
                fallbackKakaoShare(message);
            });
    } else {
        // Web Share API 미지원시 카카오톡 URL 스킴 직접 사용
        fallbackKakaoShare(message);
    }
}

// 카카오톡 URL 스킴을 사용한 공유 (폴백)
function fallbackKakaoShare(message) {
    const kakaoUrl = `kakaotalk://send?text=${encodeURIComponent(message)}`;

    // 카카오톡 앱 열기 시도
    const openKakao = window.open(kakaoUrl, "_self");

    // 1초 후 카카오톡이 열리지 않으면 링크 복사 제안
    setTimeout(() => {
        if (
            confirm(
                "카카오톡이 설치되어 있지 않거나 열 수 없습니다.\n링크를 복사하시겠습니까?"
            )
        ) {
            copyToClipboard("https://jongyoun3128.github.io/basic/");
        }
    }, 1000);

    closeShareModal();
}
// 라인 공유
function shareLine() {
    const url = window.location.href;
    const text = "도룡미소부동산 양희수 대표의 명함입니다";

    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(
        text + "\n" + url
    )}`;
    window.open(lineUrl, "_blank");

    closeShareModal();
}

// 이메일 공유
function shareEmail() {
    const subject = "도룡미소부동산 - 양희수 대표 명함";
    const body = `도룡미소부동산 양희수 대표의 명함입니다.

회사: 도룡미소부동산
대표: 양희수
전화: 010-2270-3008
이메일: bizup@bizup.com
주소:대한민국

명함 보기: ${window.location.href}`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    closeShareModal();
}

// 문자 메시지 공유
function shareSMS() {
    const text = `도룡미소부동산 양희수 대표의 명함입니다.\n\n전화: 010-2270-3008\n이메일: bizup@bizup.com\n\n명함 보기: ${window.location.href}`;

    // iOS와 Android 모두 지원
    const smsUrl = `sms:?body=${encodeURIComponent(text)}`;
    window.location.href = smsUrl;

    closeShareModal();
}

// URL 클립보드 복사
function copyToClipboard() {
    const url = window.location.href;

    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert("명함 링크가 복사되었습니다!");
            })
            .catch(() => {
                fallbackCopyToClipboard(url);
            });
    } else {
        fallbackCopyToClipboard(url);
    }
}

// 클립보드 복사 fallback
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
        alert("명함 링크가 복사되었습니다!");
    } catch (err) {
        alert("링크 복사 실패. URL을 수동으로 복사해주세요:\n" + text);
    }

    document.body.removeChild(textArea);
}
