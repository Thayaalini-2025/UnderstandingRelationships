import { useLanguage } from '../context/LanguageContext';

export const translations = {
  en: {
    // Language Selector
    selectLanguage: "Select Language",
    welcome: "Welcome! Please choose a language.",
    
    // Main Menu
    appTitle: "Understanding Relationships",
    subtitle: "Learning About Boundaries & Safety",
    chooseModule: "Choose a module to start learning!",
    module1Title: "Relationship Rainbow",
    module1Desc: "Learn about different people in your life",
    module2Title: "Safety Decisions",
    module2Desc: "Learn to stay safe and make good choices",
    module3Title: "My Body Space",
    module3Desc: "Learn about personal space and boundaries",
    parentSettings: "Parent Settings",
    howToPlay: "How to Play",
    howToPlayDesc: "Tap a colorful module above to start!",
    
    // Permission Request
    enableFeatures: "Enable Features",
    permissionDesc: "We need your permission to enable audio, voice, and other interactive features",
    requestPermissions: "Request Permissions",
    permissionsGranted: "All Permissions Granted!",
    skipForNow: "Skip for Now",
    audio: "Audio",
    microphone: "Microphone",
    camera: "Camera",
    notifications: "Notifications",
    permissionGranted: "Permission granted",
    waitingForPermission: "Waiting for permission",
  },
  ms: {
    // Language Selector
    selectLanguage: "Pilih Bahasa",
    welcome: "Selamat datang! Sila pilih bahasa.",

    // Main Menu
    appTitle: "Memahami Hubungan",
    subtitle: "Belajar Mengenai Batasan & Keselamatan",
    chooseModule: "Pilih modul untuk mula belajar!",
    module1Title: "Pelangi Hubungan",
    module1Desc: "Belajar mengenai orang yang berbeza dalam hidup anda",
    module2Title: "Keputusan Keselamatan",
    module2Desc: "Belajar untuk kekal selamat dan buat pilihan bijak",
    module3Title: "Ruang Badan Saya",
    module3Desc: "Belajar mengenai ruang peribadi dan batasan",
    parentSettings: "Tetapan Ibu Bapa",
    howToPlay: "Cara Bermain",
    howToPlayDesc: "Ketik modul berwarna di atas untuk bermula!",

    // Permission Request
    enableFeatures: "Dayakan Ciri",
    permissionDesc: "Kami memerlukan kebenaran anda untuk mendayakan audio, suara, dan ciri interaktif lain",
    requestPermissions: "Minta Kebenaran",
    permissionsGranted: "Semua Kebenaran Diberikan!",
    skipForNow: "Langkau Buat Masa Ini",
    audio: "Audio",
    microphone: "Mikrofon",
    camera: "Kamera",
    notifications: "Pemberitahuan",
    permissionGranted: "Kebenaran diberikan",
    waitingForPermission: "Menunggu kebenaran",
  },
  zh: {
    // Language Selector
    selectLanguage: "选择语言",
    welcome: "欢迎！请选择一种语言。",

    // Main Menu
    appTitle: "理解人际关系",
    subtitle: "学习界限与安全",
    chooseModule: "选择一个模块开始学习！",
    module1Title: "关系彩虹",
    module1Desc: "了解生活中不同的人",
    module2Title: "安全决定",
    module2Desc: "学习保持安全并做出明智的选择",
    module3Title: "我的身体空间",
    module3Desc: "了解个人空间和界限",
    parentSettings: "家长设置",
    howToPlay: "怎么玩",
    howToPlayDesc: "点击上方的彩色模块开始！",

    // Permission Request
    enableFeatures: "启用功能",
    permissionDesc: "我们需要您的许可来启用音频、语音和其他互动功能",
    requestPermissions: "请求许可",
    permissionsGranted: "所有许可已授予！",
    skipForNow: "暂时跳过",
    audio: "音频",
    microphone: "麦克风",
    camera: "摄像头",
    notifications: "通知",
    permissionGranted: "许可已授予",
    waitingForPermission: "等待许可",
  }
};

// Hook: returns the active language dictionary
export const useTranslation = () => {
  const { language } = useLanguage();
  return translations[language];
};

// Optional default export for compatibility with any default imports
export default useTranslation;