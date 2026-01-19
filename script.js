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
TITLE:대표/공인중개사
TEL;TYPE=CELL:010-5561-7919
EMAIL:izoa427@naver.com
ADR;TYPE=WORK:;;대한민국;도룡동;유성구;;대전
URL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "도룡미소부동산_양희수_대표/공인중개사.vcf";
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
                "카카오톡이 설치되어 있지 않거나 열 수 없습니다.\n링크를 복사하시겠습니까?",
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
    const text = "도룡미소부동산 양희수 대표/공인중개사의 명함입니다";

    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(
        text + "\n" + url,
    )}`;
    window.open(lineUrl, "_blank");

    closeShareModal();
}

// 이메일 공유
function shareEmail() {
    const subject = "도룡미소부동산 - 양희수 대표/공인중개사 명함";
    const body = `도룡미소부동산 양희수 대표/공인중개사의 명함입니다.

회사: 도룡미소부동산
대표/공인중개사: 양희수
전화: 010-5561-7919
이메일: izoa427@naver.com
주소:대한민국

명함 보기: ${window.location.href}`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    closeShareModal();
}

// 문자 메시지 공유
function shareSMS() {
    const text = `도룡미소부동산 양희수 대표/공인중개사의 명함입니다.\n\n전화: 010-5561-7919\n이메일: izoa427@naver.com\n\n명함 보기: ${window.location.href}`;

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
// 다국어 번역 데이터
const translations = {
    ko: {
        position: "대표/공인중개사",
        name: "양 희 수",
        address: "대전광역시 유성구 도룡동 4-8<br />102동 126호",
        tagline: "Business & Consulting",
        save_contact: "연락처 저장",
        kakao: "카카오톡",
        line: "라인",
        email: "이메일",
        sms: "메시지",
        business_title: "포그몰과 함께하는 다양한 비즈니스",
        pointground_desc:
            "포인트그라운드몰<br />브랜드/서비스 정보를 확인하세요",
        pointground_feature1: "✓ 공식 안내",
        pointground_feature2: "✓ 서비스 소개",
        pointground_feature3: "✓ 문의/상담",
        rental_desc: "생활과 사업에 필요한<br />다양한 렌탈 서비스",
        rental_feature1: "✓ 다양한 상품군",
        rental_feature2: "✓ 유연한 계약",
        rental_feature3: "✓ 편리한 관리",
        interior_desc: "주거와 상업 공간을 위한<br />프리미엄 인테리어 솔루션",
        interior_feature1: "✓ 맞춤형 디자인",
        interior_feature2: "✓ 합리적인 가격",
        interior_feature3: "✓ 원스톱 시공",
        cafe_desc:
            "트렌디하고 수익성 높은 카페 브랜드<br />성공적인 창업의 기회를 제공합니다",
        cafe_feature1: "✓ 체계적인 지사운영 시스템",
        cafe_feature2: "✓ 전문 교육 지원",
        cafe_feature3: "✓ 마케팅 지원",
        zeroking_desc:
            "누구나 쉽게 운영할 수 있는<br />완전 자동화 무인 스토어 창업",
        zeroking_feature1: "✓ 가맹비 0원",
        zeroking_feature2: "✓ 100% 무인 운영",
        zeroking_feature3: "✓ 설비 전체 렌탈",
        view_more: "자세히 보기",
        view_detail: "자세히보기",
    },

    en: {
        position: "CEO",
        name: "Yang Hee Soo",
        address:
            "4-8 Doryong-dong, Yuseong-gu, Daejeon<br />Building 102, Unit 126",
        tagline: "Business & Consulting",
        save_contact: "Save Contact",
        kakao: "KakaoTalk",
        line: "LINE",
        email: "Email",
        sms: "Message",
        business_title: "Various Businesses with PogMall",
        pointground_desc:
            "PointGround Mall<br />Check brand/service information",
        pointground_feature1: "✓ Official Guide",
        pointground_feature2: "✓ Service Introduction",
        pointground_feature3: "✓ Inquiry/Consultation",
        rental_desc: "Various rental services<br />for life and business",
        rental_feature1: "✓ Diverse Products",
        rental_feature2: "✓ Flexible Contracts",
        rental_feature3: "✓ Convenient Management",
        interior_desc:
            "Premium interior solutions<br />for residential and commercial spaces",
        interior_feature1: "✓ Custom Design",
        interior_feature2: "✓ Reasonable Price",
        interior_feature3: "✓ One-Stop Construction",
        cafe_desc:
            "Trendy and profitable cafe brand<br />Providing successful business opportunities",
        cafe_feature1: "✓ Systematic Branch Management",
        cafe_feature2: "✓ Professional Training",
        cafe_feature3: "✓ Marketing Support",
        zeroking_desc:
            "Easy-to-operate<br />fully automated unmanned store startup",
        zeroking_feature1: "✓ 0 Won Franchise Fee",
        zeroking_feature2: "✓ 100% Unmanned",
        zeroking_feature3: "✓ Full Equipment Rental",
        view_more: "View More",
        view_detail: "View Details",
    },

    ja: {
        position: "CEO",
        name: "ヤン・ヒス",
        address: "大田広域市 儒城区 道龍洞 4-8<br />102棟 126号",
        tagline: "ビジネス＆コンサルティング",
        save_contact: "連絡先を保存",
        kakao: "カカオトーク",
        line: "LINE",
        email: "メール",
        sms: "メッセージ",
        business_title: "ポグモールと一緒に多様なビジネス",
        pointground_desc:
            "ポイントグラウンドモール<br />ブランド/サービス情報を確認",
        pointground_feature1: "✓ 公式案内",
        pointground_feature2: "✓ サービス紹介",
        pointground_feature3: "✓ お問い合わせ/相談",
        rental_desc: "生活と事業に必要な<br />多様なレンタルサービス",
        rental_feature1: "✓ 多様な商品群",
        rental_feature2: "✓ 柔軟な契約",
        rental_feature3: "✓ 便利な管理",
        interior_desc:
            "住宅と商業空間のための<br />プレミアムインテリアソリューション",
        interior_feature1: "✓ カスタムデザイン",
        interior_feature2: "✓ 合理的な価格",
        interior_feature3: "✓ ワンストップ施工",
        cafe_desc:
            "トレン디で収益性の高いカフェブランド<br />成功的な創業の機会を提供",
        cafe_feature1: "✓ 体系的な支店運営システム",
        cafe_feature2: "✓ 専門教育支援",
        cafe_feature3: "✓ マーケティング支援",
        zeroking_desc:
            "誰でも簡単に運営できる<br />완전 자동화 무인 스토어 창업",
        zeroking_feature1: "✓ 가맹비 0원",
        zeroking_feature2: "✓ 100% 무인 운영",
        zeroking_feature3: "✓ 설비 전체 렌탈",
        view_more: "詳しく見る",
        view_detail: "詳細を見る",
    },

    zh: {
        position: "CEO",
        name: "梁熙秀",
        address: "大田广域市 儒城区 道龙洞 4-8<br />102栋 126号",
        tagline: "商务与咨询",
        save_contact: "保存联系方式",
        kakao: "KakaoTalk",
        line: "LINE",
        email: "电子邮件",
        sms: "短信",
        business_title: "与PogMall一起的各种业务",
        pointground_desc: "PointGround商城<br />查看品牌/服务信息",
        pointground_feature1: "✓ 官方指南",
        pointground_feature2: "✓ 服务介绍",
        pointground_feature3: "✓ 咨询/洽谈",
        rental_desc: "生活和事业所需的<br />各种租赁服务",
        rental_feature1: "✓ 多样商品",
        rental_feature2: "✓ 灵活合同",
        rental_feature3: "✓ 便捷管理",
        interior_desc: "住宅和商业空间<br />高端室内设计解决方案",
        interior_feature1: "✓ 定制设计",
        interior_feature2: "✓ 合理价格",
        interior_feature3: "✓ 一站式施工",
        cafe_desc: "时尚且高利润的咖啡品牌<br />提供成功创业机会",
        cafe_feature1: "✓ 系统化分支运营",
        cafe_feature2: "✓ 专业培训支持",
        cafe_feature3: "✓ 营销支持",
        zeroking_desc: "任何人都能轻松运营<br />完全自动化无人店创业",
        zeroking_feature1: "✓ 加盟费0元",
        zeroking_feature2: "✓ 100%无人运营",
        zeroking_feature3: "✓ 全套设备租赁",
        view_more: "查看更多",
        view_detail: "查看详情",
    },

    fr: {
        position: "CEO",
        name: "Yang Hee Soo",
        address:
            "4-8 Doryong-dong, Yuseong-gu, Daejeon<br />Bâtiment 102, Appartement 126",
        tagline: "Affaires et Conseil",
        save_contact: "Enregistrer Contact",
        kakao: "KakaoTalk",
        line: "LINE",
        email: "E-mail",
        sms: "Message",
        business_title: "Diverses entreprises avec PogMall",
        pointground_desc:
            "PointGround Mall<br />Vérifier les informations de marque/service",
        pointground_feature1: "✓ Guide officiel",
        pointground_feature2: "✓ Présentation du service",
        pointground_feature3: "✓ Demande/Consultation",
        rental_desc:
            "Divers services de location<br />pour la vie et les affaires",
        rental_feature1: "✓ Produits diversifiés",
        rental_feature2: "✓ Contrats flexibles",
        rental_feature3: "✓ Gestion pratique",
        interior_desc:
            "Solutions d'intérieur premium<br />pour espaces résidentiels et commerciaux",
        interior_feature1: "✓ Design personnalisé",
        interior_feature2: "✓ Prix raisonnable",
        interior_feature3: "✓ Construction tout-en-un",
        cafe_desc:
            "Marque de café tendance et rentable<br />Offrant des opportunités d'affaires réussies",
        cafe_feature1: "✓ Système de gestion systématique",
        cafe_feature2: "✓ Formation professionnelle",
        cafe_feature3: "✓ Support marketing",
        zeroking_desc: "Création de magasin automatisé<br />facile à exploiter",
        zeroking_feature1: "✓ Frais de franchise 0€",
        zeroking_feature2: "✓ 100% sans personnel",
        zeroking_feature3: "✓ Location complète d'équipement",
        view_more: "Voir plus",
        view_detail: "Voir les détails",
    },

    de: {
        position: "CEO",
        name: "Yang Hee Soo",
        address:
            "4-8 Doryong-dong, Yuseong-gu, Daejeon<br />Gebäude 102, Einheit 126",
        tagline: "Geschäft & Beratung",
        save_contact: "Kontakt speichern",
        kakao: "KakaoTalk",
        line: "LINE",
        email: "E-Mail",
        sms: "Nachricht",
        business_title: "Verschiedene Geschäfte mit PogMall",
        pointground_desc:
            "PointGround Mall<br />Marken-/Serviceinformationen prüfen",
        pointground_feature1: "✓ Offizieller Leitfaden",
        pointground_feature2: "✓ Service-Einführung",
        pointground_feature3: "✓ Anfrage/Beratung",
        rental_desc: "Verschiedene Mietdienste<br />für Leben und Geschäft",
        rental_feature1: "✓ Vielfältige Produkte",
        rental_feature2: "✓ Flexible Verträge",
        rental_feature3: "✓ Bequeme Verwaltung",
        interior_desc:
            "Premium-Innenraumlösungen<br />für Wohn- und Geschäftsräume",
        interior_feature1: "✓ Individuelles Design",
        interior_feature2: "✓ Angemessener Preis",
        interior_feature3: "✓ Komplettbau",
        cafe_desc:
            "Trendige und profitable Café-Marke<br />Bietet erfolgreiche Geschäftsmöglichkeiten",
        cafe_feature1: "✓ Systematisches Filialmanagementsystem",
        cafe_feature2: "✓ Professionelle Schulung",
        cafe_feature3: "✓ Marketing-Unterstützung",
        zeroking_desc:
            "Einfach zu betreibendes<br />vollautomatisiertes unbemanntes Geschäft",
        zeroking_feature1: "✓ 0€ Franchisegebühr",
        zeroking_feature2: "✓ 100% unbemannt",
        zeroking_feature3: "✓ Komplette Ausrüstungsmiete",
        view_more: "Mehr sehen",
        view_detail: "Details ansehen",
    },
    es: {
        position: "CEO",
        name: "Yang Hee Soo",
        address:
            "4-8 Doryong-dong, Yuseong-gu, Daejeon<br />Building 102, Unit 126",
        tagline: "Negocios y Consultoría",
        save_contact: "Guardar Contacto",
        kakao: "KakaoTalk",
        insta: "instagram",
        line: "LINE",
        email: "Correo electrónico",
        sms: "Mensaje",
        business_title: "Diversos negocios con PogMall",
        pointground_desc:
            "PointGround Mall<br />Consultar información de marca/servicio",
        pointground_feature1: "✓ Guía oficial",
        pointground_feature2: "✓ Introducción del servicio",
        pointground_feature3: "✓ Consulta/Asesoramiento",
        rental_desc: "Diversos servicios de alquiler<br />para vida y negocios",
        rental_feature1: "✓ Productos diversos",
        rental_feature2: "✓ Contratos flexibles",
        rental_feature3: "✓ Gestión conveniente",
        interior_desc:
            "Soluciones de diseño premium<br />para espacios residenciales y comerciales",
        interior_feature1: "✓ Diseño personalizado",
        interior_feature2: "✓ Precio razonable",
        interior_feature3: "✓ Construcción integral",
        cafe_desc:
            "Marca de café moderna y rentable<br />Ofreciendo oportunidades de negocio exitosas",
        cafe_feature1: "✓ Sistema de gestión sistemático",
        cafe_feature2: "✓ Capacitación profesional",
        cafe_feature3: "✓ Soporte de marketing",
        zeroking_desc: "Tienda automatizada sin personal<br />fácil de operar",
        zeroking_feature1: "✓ 0€ de franquicia",
        zeroking_feature2: "✓ 100% sin personal",
        zeroking_feature3: "✓ Alquiler completo de equipos",
        view_more: "Ver más",
        view_detail: "Ver detalles",
    },

    it: {
        position: "CEO",
        name: "Yang Hee Soo",
        address:
            "4-8 Doryong-dong, Yuseong-gu, Daejeon<br />Edificio 102, Interno 126",
        tagline: "Business e Consulenza",
        save_contact: "Salva Contatto",
        kakao: "KakaoTalk",
        insta: "instagram",
        line: "LINE",
        email: "E-mail",
        sms: "Messaggio",
        business_title: "Varie attività con PogMall",
        pointground_desc:
            "PointGround Mall<br />Controlla informazioni su marchio/servizio",
        pointground_feature1: "✓ Guida ufficiale",
        pointground_feature2: "✓ Presentazione del servizio",
        pointground_feature3: "✓ Richiesta/Consulenza",
        rental_desc: "Vari servizi di noleggio<br />per vita e affari",
        rental_feature1: "✓ Prodotti diversi",
        rental_feature2: "✓ Contratti flessibili",
        rental_feature3: "✓ Gestione conveniente",
        interior_desc:
            "Soluzioni d'interni premium<br />per spazi residenziali e commerciali",
        interior_feature1: "✓ Design personalizzato",
        interior_feature2: "✓ Prezzo ragionevole",
        interior_feature3: "✓ Costruzione completa",
        cafe_desc:
            "Marchio di caffè trendy e redditizio<br />Offre opportunità di business di successo",
        cafe_feature1: "✓ Sistema di gestione sistematico",
        cafe_feature2: "✓ Formazione professionale",
        cafe_feature3: "✓ Supporto marketing",
        zeroking_desc:
            "Negozio automatizzato senza personale<br />facile da gestire",
        zeroking_feature1: "✓ 0€ di franchising",
        zeroking_feature2: "✓ 100% senza personale",
        zeroking_feature3: "✓ Noleggio completo attrezzature",
        view_more: "Vedi di più",
        view_detail: "Vedi dettagli",
    },

    pt: {
        position: "CEO",
        name: "Yang Hee Soo",
        address:
            "4-8 Doryong-dong, Yuseong-gu, Daejeon<br />Bloco 102, Unidade 126",
        tagline: "Negócios e Consultoria",
        save_contact: "Salvar Contato",
        kakao: "KakaoTalk",
        insta: "instagram",
        line: "LINE",
        email: "E-mail",
        sms: "Mensagem",
        business_title: "Vários negócios com PogMall",
        pointground_desc:
            "PointGround Mall<br />Verifique informações de marca/serviço",
        pointground_feature1: "✓ Guia oficial",
        pointground_feature2: "✓ Apresentação do serviço",
        pointground_feature3: "✓ Consulta/Assessoria",
        rental_desc: "Vários serviços de aluguel<br />para vida e negócios",
        rental_feature1: "✓ Produtos diversos",
        rental_feature2: "✓ Contratos flexíveis",
        rental_feature3: "✓ Gestão conveniente",
        interior_desc:
            "Soluções de design premium<br />para espaços residenciais e comerciais",
        interior_feature1: "✓ Design personalizado",
        interior_feature2: "✓ Preço razoável",
        interior_feature3: "✓ Construção completa",
        cafe_desc:
            "Marca de café moderna e lucrativa<br />Oferecendo oportunidades de negócio bem-sucedidas",
        cafe_feature1: "✓ Sistema de gestão sistemático",
        cafe_feature2: "✓ Treinamento profissional",
        cafe_feature3: "✓ Suporte de marketing",
        zeroking_desc:
            "Loja automatizada sem funcionários<br />fácil de operar",
        zeroking_feature1: "✓ Taxa de franquia 0€",
        zeroking_feature2: "✓ 100% sem funcionários",
        zeroking_feature3: "✓ Aluguel completo de equipamentos",
        view_more: "Ver mais",
        view_detail: "Ver detalhes",
    },

    ru: {
        position: "CEO",
        name: "Ян Хи Су",
        address: "Тэджон, Юсон-гу, Дорён-дон 4-8<br />Корпус 102, Квартира 126",
        tagline: "Бизнес и Консалтинг",
        save_contact: "Сохранить контакт",
        kakao: "KakaoTalk",
        insta: "instagram",
        line: "LINE",
        email: "Электронная почта",
        sms: "Сообщение",
        business_title: "Различные предприятия с PogMall",
        pointground_desc:
            "PointGround Mall<br />Проверить информацию о бренде/сервисе",
        pointground_feature1: "✓ Официальный гид",
        pointground_feature2: "✓ Представление сервиса",
        pointground_feature3: "✓ Запрос/Консультация",
        rental_desc: "Различные услуги аренды<br />для жизни и бизнеса",
        rental_feature1: "✓ Разнообразные продукты",
        rental_feature2: "✓ Гибкие контракты",
        rental_feature3: "✓ Удобное управление",
        interior_desc:
            "Премиум решения для интерьера<br />жилых и коммерческих помещений",
        interior_feature1: "✓ Индивидуальный дизайн",
        interior_feature2: "✓ Разумная цена",
        interior_feature3: "✓ Комплексное строительство",
        cafe_desc:
            "Модный и прибыльный бренд кафе<br />Предоставление успешных бизнес-возможностей",
        cafe_feature1: "✓ Систематическая система управления",
        cafe_feature2: "✓ Профессиональное обучение",
        cafe_feature3: "✓ Поддержка маркетинга",
        zeroking_desc:
            "Легкий в управлении<br />полностью автоматизированный магазин",
        zeroking_feature1: "✓ 0₽ франшизы",
        zeroking_feature2: "✓ 100% без персонала",
        zeroking_feature3: "✓ Полная аренда оборудования",
        view_more: "Посмотреть больше",
        view_detail: "Посмотреть детали",
    },
};

// 현재 언어 설정
let currentLang = "ko";

// 언어 변경 함수
function changeLanguage(lang) {
    currentLang = lang;

    // 모든 번역 가능한 요소 찾기
    const elements = document.querySelectorAll("[data-translate]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // 활성 언어 버튼 표시
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.remove("active");
    });
    document
        .querySelector(`.lang-btn[data-lang="${lang}"]`)
        .classList.add("active");

    // 로컬 스토리지에 저장
    localStorage.setItem("selectedLanguage", lang);
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
    // 저장된 언어 불러오기
    const savedLang = localStorage.getItem("selectedLanguage") || "ko";
    changeLanguage(savedLang);

    // 언어 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const lang = this.getAttribute("data-lang");
            changeLanguage(lang);
        });
    });
});
