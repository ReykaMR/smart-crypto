"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "id" | "en";

export interface Translation {
  nav: {
    dashboard: string;
    glossary: string;
    simulation: string;
    certificates: string;
    profile: string;
    about: string;
    login: string;
    register: string;
    logout: string;
    adminPanel: string;
    admin: string;
  };
  landing: {
    hero: {
      tagline: string;
      title: string;
      subtitle: string;
      cta: string;
      learnMore: string;
    };
    stats: {
      modules: string;
      lessons: string;
      terms: string;
      free: string;
    };
    features: {
      title: string;
      subtitle: string;
      stepByStep: string;
      stepByStepDesc: string;
      quiz: string;
      quizDesc: string;
      progress: string;
      progressDesc: string;
      flexible: string;
      flexibleDesc: string;
      glossary: string;
      glossaryDesc: string;
      certificate: string;
      certificateDesc: string;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      step1: string;
      step1Desc: string;
      step2: string;
      step2Desc: string;
      step3: string;
      step3Desc: string;
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
    footer: {
      description: string;
      navigation: string;
      legal: string;
      contact: string;
      disclaimer: string;
      copyright: string;
      features: string;
      glossary: string;
      about: string;
      login: string;
      privacyPolicy: string;
      termsOfService: string;
      contactQuestion: string;
    };
  };
  auth: {
    login: {
      title: string;
      subtitle: string;
      email: string;
      password: string;
      submit: string;
      loading: string;
      or: string;
      google: string;
      noAccount: string;
      signUp: string;
    };
    register: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      password: string;
      passwordHint: string;
      submit: string;
      loading: string;
      hasAccount: string;
      signIn: string;
    };
  };
  dashboard: {
    welcome: string;
    subtitle: string;
    progress: string;
    lessons: string;
    certificates: string;
    continue: string;
    continueLearning: string;
    yourCourses: string;
    complete: string;
    locked: string;
    free: string;
    keepGoing: string;
    lastAccessed: string;
    of: string;
    learner: string;
  };
  glossary: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    displaying: string;
    from: string;
    terms: string;
    notFound: string;
    loginCTA: string;
    loginCTADesc: string;
    registerNow: string;
    example: string;
  };
  simulation: {
    title: string;
    subtitle: string;
    totalValue: string;
    availableBalance: string;
    profitLoss: string;
    starting: string;
    yourHoldings: string;
    noHoldings: string;
    startTrading: string;
    tradeCrypto: string;
    selectCrypto: string;
    amount: string;
    buy: string;
    sell: string;
    recentTransactions: string;
    noTransactions: string;
    type: string;
    crypto: string;
    price: string;
    total: string;
    date: string;
    disclaimer: string;
    processing: string;
    tokens: string;
  };
  certificates: {
    title: string;
    subtitle: string;
    earned: string;
    available: string;
    noCertificates: string;
    completeLessons: string;
    downloadPDF: string;
    certificateId: string;
    generate: string;
    obtained: string;
    generating: string;
    failedToGenerate: string;
  };
  profile: {
    title: string;
    memberSince: string;
    admin: string;
    lessonsCompleted: string;
    certificatesEarned: string;
    quizzesPassed: string;
    badgesEarned: string;
    badgeProgress: string;
    from: string;
    badges: string;
    earnedBadges: string;
    noBadges: string;
    completeLessonsToUnlock: string;
    availableBadges: string;
    unnamedUser: string;
  };
  about: {
    title: string;
    about: {
      title: string;
      p1: string;
      p2: string;
      mission: string;
      team: string;
      easyToUnderstand: string;
      easyToUnderstandDesc: string;
      structured: string;
      structuredDesc: string;
      safe: string;
      safeDesc: string;
      free: string;
      freeDesc: string;
    };
    disclaimer: {
      title: string;
      education: string;
      risk: string;
      dyor: string;
      liability: string;
      professional: string;
    };
    contact: {
      title: string;
      info: string;
      email: string;
      location: string;
      responseTime: string;
      responseTimeValue: string;
      name: string;
      emailLabel: string;
      subject: string;
      subjectPlaceholder: string;
      generalSubject: string;
      technicalSubject: string;
      contentSubject: string;
      partnershipSubject: string;
      otherSubject: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      success: string;
      error: string;
      loginToContact: string;
      login: string;
      namePlaceholder: string;
      emailPlaceholder: string;
    };
    faq: {
      title: string;
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
      q5: string;
      a5: string;
    };
  };
  common: {
    back: string;
    next: string;
    previous: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    loading: string;
    success: string;
    error: string;
    close: string;
    lesson: string;
    module: string;
    course: string;
    quiz: string;
    passed: string;
    failed: string;
    retry: string;
    markComplete: string;
    lessonCompleted: string;
    score: string;
    yourScore: string;
    congratulations: string;
    keepLearning: string;
    submitQuiz: string;
    question: string;
  };
  admin: {
    dashboard: string;
    courses: string;
    glossary: string;
    users: string;
    backToDashboard: string;
    courseManagement: string;
    manageCourses: string;
    addCourse: string;
    edit: string;
    delete: string;
    published: string;
    draft: string;
    students: string;
    modules: string;
    certificates: string;
    addModule: string;
    addLesson: string;
    free: string;
    locked: string;
    slug: string;
    description: string;
    order: string;
    duration: string;
    freePreview: string;
    title: string;
    totalUsers: string;
    glossaryTerms: string;
    lessonsCompleted: string;
    quizAttempts: string;
    recentUsers: string;
    recentActivity: string;
    adminDashboard: string;
    managePlatform: string;
    admin: string;
    adminPanel: string;
    toggleMenu: string;
    allRightsReserved: string;
    userDashboard: string;
    about: string;
    support: string;
    version: string;
    completedLesson: string;
    recentActivityDesc: string;
    user: string;
    role: string;
    joined: string;
    unnamedUser: string;
    viewAllUsers: string;
    manageUsers: string;
    adminUsers: string;
    regularUsers: string;
    progress: string;
    quizzes: string;
    editCourse: string;
    deleteCourseConfirm: string;
    deleteLessonConfirm: string;
    contentMarkdown: string;
    module: string;
    lesson: string;
  };
  lesson: {
    markComplete: string;
    saving: string;
    lessonCompleted: string;
    quizTitle: string;
    passingScore: string;
    submitting: string;
    submitQuiz: string;
    tryAgain: string;
    continueNext: string;
    lessonLocked: string;
    unlockMessage: string;
    goToPrevious: string;
    dashboard: string;
    minRead: string;
    congratulations: string;
    keepLearning: string;
    yourScore: string;
    previous: string;
    next: string;
    question: string;
    example: string;
    close: string;
  };
}

export const translations: Record<Language, Translation> = {
  id: {
    nav: {
      dashboard: "Dashboard",
      glossary: "Glosarium",
      simulation: "Simulasi",
      certificates: "Sertifikat",
      profile: "Profil",
      about: "Tentang",
      login: "Masuk",
      register: "Daftar",
      logout: "Keluar",
      adminPanel: "Panel Admin",
      admin: "Admin",
    },
    landing: {
      hero: {
        tagline: "🚀 Mulai Belajar Hari Ini",
        title: "Belajar Crypto dari Nol,\nTanpa Jargon Rumit",
        subtitle:
          "Pahami cryptocurrency, blockchain, dan cara investasinya dengan panduan step-by-step yang mudah dipahami pemula.",
        cta: "Mulai Belajar - Gratis",
        learnMore: "Pelajari Lebih Lanjut",
      },
      stats: {
        modules: "Modul Pembelajaran",
        lessons: "Pelajaran",
        terms: "Istilah Crypto",
        free: "Gratis",
      },
      features: {
        title: "Apa yang Akan Anda Pelajari?",
        subtitle:
          "Materi lengkap dari dasar hingga siap berinvestasi dengan bijak",
        stepByStep: "Materi Bertahap",
        stepByStepDesc:
          "Dari apa itu crypto hingga cara menyimpan aset dengan aman. Setiap bab fokus pada satu topik.",
        quiz: "Kuis & Evaluasi",
        quizDesc:
          "Soal pilihan ganda di akhir modul untuk memastikan pemahaman. Nilai langsung tampil.",
        progress: "Progress Tracking",
        progressDesc:
          "Pantau perkembangan belajar dengan visual progress, lengkap dengan persentase dan badge.",
        flexible: "Mode Fleksibel",
        flexibleDesc:
          "Akses dari desktop atau mobile. Progress tersimpan otomatis dan bisa dilanjutkan kapan saja.",
        glossary: "Glosarium Interaktif",
        glossaryDesc:
          "Klik istilah crypto untuk melihat definisi pop-up. Lebih dari 100 istilah dijelaskan.",
        certificate: "Sertifikat Kelulusan",
        certificateDesc:
          "Dapatkan sertifikat digital setelah menyelesaikan semua modul. Bisa diunduh dan dibagikan.",
      },
      howItWorks: {
        title: "Cara Kerja Platform",
        subtitle: "Tiga langkah mudah untuk mulai belajar",
        step1: "Daftar Gratis",
        step1Desc: "Buat akun dalam hitungan menit. Tidak perlu kartu kredit.",
        step2: "Mulai Belajar",
        step2Desc: "Akses modul pembelajaran interaktif dengan contoh nyata.",
        step3: "Dapatkan Sertifikat",
        step3Desc:
          "Selesaikan semua modul dan kuis untuk mendapatkan sertifikat.",
      },
      cta: {
        title: "Siap Memulai Perjalanan Crypto Anda?",
        subtitle:
          "Bergabunglah dengan ribuan pemula lainnya yang sudah memahami crypto",
        button: "Mulai Belajar Sekarang - 100% Gratis",
      },
      footer: {
        description:
          "Platform pembelajaran crypto untuk pemula. Edukasi, bukan saran investasi.",
        navigation: "Navigasi",
        legal: "Legal",
        contact: "Kontak",
        disclaimer:
          "⚠️ Disclaimer: Konten di website ini hanya untuk tujuan edukasi, bukan saran investasi. Crypto adalah aset berisiko tinggi. Selalu lakukan riset sendiri.",
        copyright: "Smart Crypto. All rights reserved.",
        features: "Fitur",
        glossary: "Glosarium",
        about: "Tentang",
        login: "Login",
        privacyPolicy: "Kebijakan Privasi",
        termsOfService: "Syarat Layanan",
        contactQuestion: "Punya pertanyaan? Hubungi kami di",
      },
    },
    auth: {
      login: {
        title: "Selamat Datang Kembali",
        subtitle: "Masuk untuk melanjutkan belajar",
        email: "Email",
        password: "Kata Sandi",
        submit: "Masuk",
        loading: "Memproses...",
        or: "Atau lanjutkan dengan",
        google: "Masuk dengan Google",
        noAccount: "Belum punya akun?",
        signUp: "Daftar",
      },
      register: {
        title: "Buat Akun",
        subtitle: "Mulai perjalanan belajar crypto Anda",
        name: "Nama Lengkap",
        email: "Email",
        password: "Kata Sandi",
        passwordHint: "Minimal 8 karakter",
        submit: "Buat Akun",
        loading: "Membuat akun...",
        hasAccount: "Sudah punya akun?",
        signIn: "Masuk",
      },
    },
    dashboard: {
      welcome: "Selamat datang",
      subtitle: "Lanjutkan perjalanan belajar crypto Anda",
      progress: "Overall Progress",
      lessons: "Pelajaran Selesai",
      certificates: "Sertifikat",
      continue: "Lanjutkan",
      continueLearning: "Lanjutkan Belajar",
      yourCourses: "Kursus Anda",
      complete: "Selesai",
      locked: "Terkunci",
      free: "Gratis",
      keepGoing: "Teruslah belajar!",
      lastAccessed: "Pelajaran terakhir diakses",
      of: "dari",
      learner: "Pelajar",
    },
    glossary: {
      title: "📖 Glosarium Crypto",
      subtitle: "Kamus lengkap istilah-istilah cryptocurrency",
      searchPlaceholder: "Cari istilah crypto...",
      allCategories: "Semua",
      displaying: "Menampilkan",
      from: "dari",
      terms: "istilah",
      notFound: "Istilah tidak ditemukan",
      loginCTA:
        "Ingin progress belajar tersimpan? Daftar gratis untuk akses fitur lengkap!",
      loginCTADesc: "Login untuk menyimpan progress belajar Anda", // diperbaiki
      registerNow: "Daftar Sekarang",
      example: "Contoh",
    },
    simulation: {
      title: "📊 Simulasi Portofolio",
      subtitle: "Belajar investasi crypto tanpa risiko dengan uang virtual",
      totalValue: "Total Nilai",
      availableBalance: "Saldo Tersedia",
      profitLoss: "Untung / Rugi",
      starting: "Awal",
      yourHoldings: "Kepemilikan Anda",
      noHoldings: "Belum ada kepemilikan. Mulai trading!",
      startTrading: "Mulai Trading",
      tradeCrypto: "Trading Crypto",
      selectCrypto: "Pilih Crypto",
      amount: "Jumlah",
      buy: "Beli",
      sell: "Jual",
      recentTransactions: "Transaksi Terbaru",
      noTransactions: "Belum ada transaksi",
      type: "Tipe",
      crypto: "Crypto",
      price: "Harga",
      total: "Total",
      date: "Tanggal",
      disclaimer:
        "⚠️ Disclaimer: Ini adalah simulasi dengan uang virtual. Harga yang digunakan adalah harga mock dan tidak real-time. Gunakan ini sebagai alat pembelajaran, bukan sebagai saran investasi.",
      processing: "Memproses...",
      tokens: "token",
    },
    certificates: {
      title: "🎓 Sertifikat Saya",
      subtitle: "Unduh sertifikat kelulusan Anda",
      earned: "Sertifikat yang Diperoleh",
      available: "Kursus Tersedia",
      noCertificates: "Anda belum memiliki sertifikat",
      completeLessons:
        "Selesaikan semua modul dalam sebuah kursus untuk mendapatkan sertifikat",
      downloadPDF: "📥 Download PDF",
      certificateId: "ID Sertifikat",
      generate: "Buat Sertifikat",
      obtained: "✓ Diperoleh",
      generating: "Membuat...",
      failedToGenerate: "Gagal membuat sertifikat",
    },
    profile: {
      title: "Profil Saya",
      memberSince: "Bergabung",
      admin: "Admin",
      lessonsCompleted: "Pelajaran Selesai",
      certificatesEarned: "Sertifikat",
      quizzesPassed: "Kuis Lulus",
      badgesEarned: "Badge",
      badgeProgress: "Progress Badge",
      from: "dari",
      badges: "badges",
      earnedBadges: "🏆 Badges yang Diperoleh",
      noBadges: "Belum ada badge",
      completeLessonsToUnlock:
        "Selesaikan pelajaran, kuis, dan dapatkan sertifikat untuk membuka badge!",
      availableBadges: "🔒 Badge Tersedia",
      unnamedUser: "Pengguna",
    },
    about: {
      title: "Tentang & Dukungan",
      about: {
        title: "Tentang Smart Crypto",
        p1: "Smart Crypto adalah platform pembelajaran cryptocurrency yang dirancang khusus untuk pemula. Kami percaya bahwa siapa pun dapat memahami teknologi blockchain dan crypto tanpa perlu background teknis atau finansial.",
        p2: "Misi kami adalah menyediakan edukasi crypto yang:",
        mission: "Tim Kami",
        team: "Smart Crypto dibuat oleh tim yang peduli dengan edukasi crypto di Indonesia. Kami terdiri dari educator, developer, dan crypto enthusiast yang ingin membuat pembelajaran crypto lebih accessible untuk semua orang.",
        easyToUnderstand: "Mudah Dipahami",
        easyToUnderstandDesc:
          "Tanpa jargon rumit, penjelasan dengan bahasa sehari-hari",
        structured: "Terstruktur",
        structuredDesc: "Materi disusun dari dasar hingga menengah",
        safe: "Aman",
        safeDesc: "Fokus pada edukasi, bukan rekomendasi investasi",
        free: "Gratis",
        freeDesc: "Akses semua materi tanpa biaya",
      },
      disclaimer: {
        title: "Disclaimer Penting",
        education:
          "Konten Edukasi Saja: Semua konten di Smart Crypto disediakan hanya untuk tujuan informasi dan edukasi. Ini bukan saran investasi, rekomendasi trading, atau ajakan untuk membeli/menjual cryptocurrency apa pun.",
        risk: "Risiko Tinggi: Cryptocurrency adalah aset dengan volatilitas sangat tinggi. Harga dapat naik atau turun secara drastis dalam waktu singkat. Anda bisa kehilangan seluruh investasi Anda.",
        dyor: "Lakukan Riset Sendiri: Selalu lakukan penelitian Anda sendiri (DYOR - Do Your Own Research) sebelum membuat keputusan investasi apa pun. Jangan pernah investasi lebih dari yang Anda mampu untuk kehilangan.",
        liability:
          "Tidak Ada Tanggung Jawab: Smart Crypto tidak bertanggung jawab atas kerugian finansial apa pun yang mungkin Anda alami sebagai hasil dari penggunaan informasi di platform ini.",
        professional:
          "Bukan Saran Profesional: Konten kami tidak menggantikan saran dari profesional finansial bersertifikat. Konsultasikan dengan advisor finansial sebelum membuat keputusan investasi penting.",
      },
      contact: {
        title: "Hubungi Kami",
        info: "Informasi Kontak",
        email: "Email",
        location: "Lokasi",
        responseTime: "Waktu Respons",
        responseTimeValue: "1-2 hari kerja",
        name: "Nama",
        emailLabel: "Email",
        subject: "Subjek",
        subjectPlaceholder: "Pilih subjek",
        generalSubject: "Pertanyaan Umum",
        technicalSubject: "Masalah Teknis",
        contentSubject: "Saran Konten",
        partnershipSubject: "Kerjasama",
        otherSubject: "Lainnya",
        message: "Pesan",
        messagePlaceholder: "Tulis pesan Anda...",
        send: "Kirim Pesan",
        sending: "Mengirim...",
        success: "✓ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
        error: "✗ Terjadi kesalahan. Silakan coba lagi.",
        loginToContact: "Silakan login untuk mengirim pesan",
        login: "Masuk",
        namePlaceholder: "Nama Anda",
        emailPlaceholder: "email@anda.com",
      },
      faq: {
        title: "FAQ (Frequently Asked Questions)",
        q1: "Apakah Smart Crypto gratis?",
        a1: "Ya, 100% gratis! Kami berkomitmen untuk menyediakan edukasi crypto yang accessible untuk semua orang.",
        q2: "Apakah saya bisa trading di platform ini?",
        a2: "Tidak. Smart Crypto adalah platform edukasi, bukan exchange. Kami tidak menyediakan fitur trading atau investasi real.",
        q3: "Bagaimana cara memulai?",
        a3: "Daftar akun gratis, lalu akses dashboard untuk mulai belajar dari modul pertama. Kami rekomendasikan mengikuti urutan modul yang tersedia.",
        q4: "Apakah ada sertifikat?",
        a4: "Ya! Setelah menyelesaikan semua modul dalam sebuah kursus, Anda akan mendapatkan sertifikat digital yang bisa diunduh.",
        q5: "Apakah konten ini cocok untuk saya yang benar-benar pemula?",
        a5: "Sangat cocok! Konten kami dirancang khusus untuk orang tanpa background teknis atau finansial sekalipun.",
      },
    },
    common: {
      back: "Kembali",
      next: "Lanjut",
      previous: "Sebelumnya",
      save: "Simpan",
      cancel: "Batal",
      delete: "Hapus",
      edit: "Edit",
      add: "Tambah",
      loading: "Memproses...",
      success: "Berhasil",
      error: "Terjadi kesalahan",
      close: "Tutup",
      lesson: "Pelajaran",
      module: "Modul",
      course: "Kursus",
      quiz: "Kuis",
      passed: "Lulus",
      failed: "Gagal",
      retry: "Coba Lagi",
      markComplete: "✓ Tandai Selesai",
      lessonCompleted: "Pelajaran Selesai!",
      score: "Nilai",
      yourScore: "Nilai Anda",
      congratulations: "Selamat!",
      keepLearning: "Terus Belajar!",
      submitQuiz: "Kirim Jawaban",
      question: "Pertanyaan",
    },
    admin: {
      dashboard: "Dashboard",
      courses: "Kursus",
      glossary: "Glosarium",
      users: "Pengguna",
      backToDashboard: "← Kembali ke Dashboard",
      totalUsers: "Jumlah Pengguna",
      glossaryTerms: "Istilah Glosarium",
      lessonsCompleted: "Pelajaran Selesai",
      quizAttempts: "Upaya Kuis",
      recentUsers: "Pengguna Terbaru",
      recentActivity: "Aktivitas Terkini",
      courseManagement: "Manajemen Kursus",
      manageCourses: "Kelola kursus, modul, dan pelajaran",
      addCourse: "+ Tambah Kursus",
      edit: "Edit",
      delete: "Hapus",
      published: "Diterbitkan",
      draft: "Draf",
      students: "siswa",
      modules: "modul",
      certificates: "sertifikat",
      addModule: "+ Tambah Modul",
      addLesson: "+ Tambah Pelajaran",
      free: "Gratis",
      locked: "🔒",
      slug: "Slug",
      description: "Deskripsi",
      order: "Urutan",
      duration: "Durasi (menit)",
      freePreview: "Pratinjau Gratis",
      title: "Judul",
      adminDashboard: "Dashboard Admin",
      managePlatform: "Kelola konten platform Anda",
      admin: "Admin",
      adminPanel: "Panel Admin",
      toggleMenu: "Alihkan menu",
      allRightsReserved: "Hak cipta dilindungi.",
      userDashboard: "Dashboard Pengguna",
      about: "Tentang",
      support: "Dukungan",
      version: "Versi 1.0.0",
      completedLesson: "menyelesaikan pelajaran",
      recentActivityDesc:
        "Menampilkan aktivitas belajar terbaru di seluruh platform",
      user: "Pengguna",
      role: "Peran",
      joined: "Bergabung",
      unnamedUser: "Pengguna Tanpa Nama",
      viewAllUsers: "Lihat semua pengguna →",
      manageUsers: "Kelola semua pengguna",
      adminUsers: "Pengguna Admin",
      regularUsers: "Pengguna Biasa",
      progress: "Kemajuan",
      quizzes: "Kuis",
      editCourse: "Edit Kursus",
      deleteCourseConfirm: "Hapus kursus ini?",
      deleteLessonConfirm: "Hapus pelajaran ini?",
      contentMarkdown: "Konten (Markdown)",
      module: "Modul",
      lesson: "Pelajaran",
    },
    lesson: {
      markComplete: "✓ Tandai Selesai",
      saving: "Menyimpan...",
      lessonCompleted: "Pelajaran Selesai!",
      quizTitle: "📝",
      passingScore: "Nilai kelulusan",
      submitting: "Mengirim...",
      submitQuiz: "Kirim Jawaban",
      tryAgain: "Coba Lagi",
      continueNext: "Lanjut ke Pelajaran Berikutnya →",
      lessonLocked: "Pelajaran Terkunci",
      unlockMessage:
        "Selesaikan pelajaran sebelumnya untuk membuka pelajaran ini.",
      goToPrevious: "Buka Pelajaran Sebelumnya",
      dashboard: "Dashboard",
      minRead: "menit baca",
      congratulations: "Selamat!",
      keepLearning: "Terus Belajar!",
      yourScore: "Nilai Anda",
      previous: "← Sebelumnya",
      next: "Berikutnya →",
      question: "Pertanyaan",
      example: "Contoh",
      close: "Tutup",
    },
  },
  en: {
    nav: {
      dashboard: "Dashboard",
      glossary: "Glossary",
      simulation: "Simulation",
      certificates: "Certificates",
      profile: "Profile",
      about: "About",
      login: "Login",
      register: "Register",
      logout: "Logout",
      adminPanel: "Admin Panel",
      admin: "Admin",
    },
    landing: {
      hero: {
        tagline: "🚀 Start Learning Today",
        title: "Learn Crypto from Zero,\nWithout Complex Jargon",
        subtitle:
          "Understand cryptocurrency, blockchain, and how to invest with step-by-step guidance easy for beginners.",
        cta: "Start Learning - Free",
        learnMore: "Learn More",
      },
      stats: {
        modules: "Learning Modules",
        lessons: "Lessons",
        terms: "Crypto Terms",
        free: "Free",
      },
      features: {
        title: "What Will You Learn?",
        subtitle: "Complete materials from basics to smart investing",
        stepByStep: "Step-by-Step Materials",
        stepByStepDesc:
          "From what is crypto to storing assets safely. Each chapter focuses on one topic.",
        quiz: "Quiz & Evaluation",
        quizDesc:
          "Multiple choice questions at the end of each module. Instant results.",
        progress: "Progress Tracking",
        progressDesc:
          "Track your learning progress visually, with percentages and badges.",
        flexible: "Flexible Learning",
        flexibleDesc:
          "Access from desktop or mobile. Progress saved automatically.",
        glossary: "Interactive Glossary",
        glossaryDesc:
          "Click crypto terms to see pop-up definitions. Over 100 terms explained.",
        certificate: "Completion Certificate",
        certificateDesc:
          "Get digital certificate after completing all modules. Downloadable and shareable.",
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "Three easy steps to start learning",
        step1: "Register Free",
        step1Desc: "Create an account in minutes. No credit card required.",
        step2: "Start Learning",
        step2Desc: "Access interactive learning modules with real examples.",
        step3: "Get Certificate",
        step3Desc: "Complete all modules and quizzes to earn your certificate.",
      },
      cta: {
        title: "Ready to Start Your Crypto Journey?",
        subtitle: "Join thousands of beginners who already understand crypto",
        button: "Start Learning Now - 100% Free",
      },
      footer: {
        description:
          "Crypto learning platform for beginners. Education, not investment advice.",
        navigation: "Navigation",
        legal: "Legal",
        contact: "Contact",
        disclaimer:
          "⚠️ Disclaimer: Content on this website is for educational purposes only, not investment advice. Crypto is high-risk. Always do your own research.",
        copyright: "Smart Crypto. All rights reserved.",
        features: "Features",
        glossary: "Glossary",
        about: "About",
        login: "Login",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        contactQuestion: "Have questions? Contact us at",
      },
    },
    auth: {
      login: {
        title: "Welcome Back",
        subtitle: "Sign in to continue learning",
        email: "Email",
        password: "Password",
        submit: "Sign In",
        loading: "Signing in...",
        or: "Or continue with",
        google: "Sign in with Google",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
      },
      register: {
        title: "Create Account",
        subtitle: "Start your crypto learning journey",
        name: "Full Name",
        email: "Email",
        password: "Password",
        passwordHint: "Must be at least 8 characters",
        submit: "Create Account",
        loading: "Creating account...",
        hasAccount: "Already have an account?",
        signIn: "Sign in",
      },
    },
    dashboard: {
      welcome: "Welcome back",
      subtitle: "Continue your crypto learning journey",
      progress: "Overall Progress",
      lessons: "Lessons Completed",
      certificates: "Certificates",
      continue: "Continue",
      continueLearning: "Continue Learning",
      yourCourses: "Your Courses",
      complete: "Complete",
      locked: "Locked",
      free: "Free",
      keepGoing: "Keep learning!",
      lastAccessed: "Last accessed lesson",
      of: "of",
      learner: "Learner",
    },
    glossary: {
      title: "📖 Crypto Glossary",
      subtitle: "Complete dictionary of cryptocurrency terms",
      searchPlaceholder: "Search crypto terms...",
      allCategories: "All",
      displaying: "Displaying",
      from: "from",
      terms: "terms",
      notFound: "No terms found",
      loginCTA: "Want to save your progress? Register free for full access!",
      loginCTADesc: "Please login to save your progress", // diperbaiki
      registerNow: "Register Now",
      example: "Example",
    },
    simulation: {
      title: "📊 Portfolio Simulation",
      subtitle: "Learn crypto investing without risk using virtual money",
      totalValue: "Total Value",
      availableBalance: "Available Balance",
      profitLoss: "Profit / Loss",
      starting: "Starting",
      yourHoldings: "Your Holdings",
      noHoldings: "No holdings yet. Start trading!",
      startTrading: "Start Trading",
      tradeCrypto: "Trade Crypto",
      selectCrypto: "Select Crypto",
      amount: "Amount",
      buy: "Buy",
      sell: "Sell",
      recentTransactions: "Recent Transactions",
      noTransactions: "No transactions yet",
      type: "Type",
      crypto: "Crypto",
      price: "Price",
      total: "Total",
      date: "Date",
      disclaimer:
        "⚠️ Disclaimer: This is a simulation with virtual money. Prices are mock data and not real-time. Use this as a learning tool, not investment advice.",
      processing: "Processing...",
      tokens: "tokens",
    },
    certificates: {
      title: "🎓 My Certificates",
      subtitle: "Download your completion certificates",
      earned: "Earned Certificates",
      available: "Available Courses",
      noCertificates: "You don't have any certificates yet",
      completeLessons: "Complete all modules in a course to earn a certificate",
      downloadPDF: "📥 Download PDF",
      certificateId: "Certificate ID",
      generate: "Generate Certificate",
      obtained: "✓ Obtained",
      generating: "Generating...",
      failedToGenerate: "Failed to generate certificate",
    },
    profile: {
      title: "My Profile",
      memberSince: "Member since",
      admin: "Admin",
      lessonsCompleted: "Lessons Completed",
      certificatesEarned: "Certificates",
      quizzesPassed: "Quizzes Passed",
      badgesEarned: "Badges",
      badgeProgress: "Badge Progress",
      from: "from",
      badges: "badges",
      earnedBadges: "🏆 Earned Badges",
      noBadges: "No badges yet",
      completeLessonsToUnlock:
        "Complete lessons, quizzes, and earn certificates to unlock badges!",
      availableBadges: "🔒 Available Badges",
      unnamedUser: "User",
    },
    about: {
      title: "About & Support",
      about: {
        title: "About Smart Crypto",
        p1: "Smart Crypto is a cryptocurrency learning platform designed specifically for beginners. We believe anyone can understand blockchain and crypto technology without needing a technical or financial background.",
        p2: "Our mission is to provide crypto education that is:",
        mission: "Our Team",
        team: "Smart Crypto is created by a team passionate about crypto education in Indonesia. We consist of educators, developers, and crypto enthusiasts who want to make crypto learning more accessible for everyone.",
        easyToUnderstand: "Easy to Understand",
        easyToUnderstandDesc:
          "No complex jargon, explained in everyday language",
        structured: "Structured",
        structuredDesc: "Materials organized from basics to intermediate",
        safe: "Safe",
        safeDesc: "Focus on education, not investment recommendations",
        free: "Free",
        freeDesc: "Access all materials at no cost",
      },
      disclaimer: {
        title: "Important Disclaimer",
        education:
          "Educational Content Only: All content on Smart Crypto is provided for informational and educational purposes only. This is not investment advice, trading recommendations, or solicitation to buy/sell any cryptocurrency.",
        risk: "High Risk: Cryptocurrency is a highly volatile asset. Prices can rise or fall dramatically in a short time. You could lose your entire investment.",
        dyor: "Do Your Own Research: Always do your own research (DYOR) before making any investment decisions. Never invest more than you can afford to lose.",
        liability:
          "No Liability: Smart Crypto is not responsible for any financial losses you may incur as a result of using information on this platform.",
        professional:
          "Not Professional Advice: Our content does not replace advice from certified financial professionals. Consult with a financial advisor before making important investment decisions.",
      },
      contact: {
        title: "Contact Us",
        info: "Contact Information",
        email: "Email",
        location: "Location",
        responseTime: "Response Time",
        responseTimeValue: "1-2 business days",
        name: "Name",
        emailLabel: "Email",
        subject: "Subject",
        subjectPlaceholder: "Select subject",
        generalSubject: "General Question",
        technicalSubject: "Technical Issue",
        contentSubject: "Content Suggestion",
        partnershipSubject: "Partnership",
        otherSubject: "Other",
        message: "Message",
        messagePlaceholder: "Write your message...",
        send: "Send Message",
        sending: "Sending...",
        success: "✓ Message sent successfully! We will contact you soon.",
        error: "✗ An error occurred. Please try again.",
        loginToContact: "Please login to send a message",
        login: "Login",
        namePlaceholder: "Your Name",
        emailPlaceholder: "your@email.com",
      },
      faq: {
        title: "FAQ (Frequently Asked Questions)",
        q1: "Is Smart Crypto free?",
        a1: "Yes, 100% free! We're committed to providing accessible crypto education for everyone.",
        q2: "Can I trade on this platform?",
        a2: "No. Smart Crypto is an educational platform, not an exchange. We do not provide real trading or investment features.",
        q3: "How do I get started?",
        a3: "Register a free account, then access the dashboard to start learning from the first module. We recommend following the module order.",
        q4: "Is there a certificate?",
        a4: "Yes! After completing all modules in a course, you will receive a digital certificate that can be downloaded.",
        q5: "Is this content suitable for complete beginners?",
        a5: "Absolutely! Our content is designed specifically for people without any technical or financial background.",
      },
    },
    common: {
      back: "Back",
      next: "Next",
      previous: "Previous",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      loading: "Loading...",
      success: "Success",
      error: "Error",
      close: "Close",
      lesson: "Lesson",
      module: "Module",
      course: "Course",
      quiz: "Quiz",
      passed: "Passed",
      failed: "Failed",
      retry: "Retry",
      markComplete: "✓ Mark as Complete",
      lessonCompleted: "Lesson Completed!",
      score: "Score",
      yourScore: "Your Score",
      congratulations: "Congratulations!",
      keepLearning: "Keep Learning!",
      submitQuiz: "Submit Quiz",
      question: "Question",
    },
    admin: {
      dashboard: "Dashboard",
      courses: "Courses",
      glossary: "Glossary",
      users: "Users",
      backToDashboard: "← Back to Dashboard",
      totalUsers: "Total Users",
      glossaryTerms: "Glossary Terms",
      lessonsCompleted: "Lessons Completed",
      quizAttempts: "Quiz Attempts",
      recentUsers: "Recent Users",
      recentActivity: "Recent Activity",
      courseManagement: "Course Management",
      manageCourses: "Manage courses, modules, and lessons",
      addCourse: "+ Add Course",
      edit: "Edit",
      delete: "Delete",
      published: "Published",
      draft: "Draft",
      students: "students",
      modules: "modules",
      certificates: "certificates",
      addModule: "+ Add Module",
      addLesson: "+ Add Lesson",
      free: "Free",
      locked: "🔒",
      slug: "Slug",
      description: "Description",
      order: "Order",
      duration: "Duration (min)",
      freePreview: "Free Preview",
      title: "Title",
      adminDashboard: "Admin Dashboard",
      managePlatform: "Manage your platform content",
      admin: "Admin",
      adminPanel: "Admin Panel",
      toggleMenu: "Toggle menu",
      allRightsReserved: "All rights reserved.",
      userDashboard: "User Dashboard",
      about: "About",
      support: "Support",
      version: "Version 1.0.0",
      completedLesson: "completed lesson",
      recentActivityDesc:
        "Showing recent learning activity across the platform",
      user: "User",
      role: "Role",
      joined: "Joined",
      unnamedUser: "Unnamed User",
      viewAllUsers: "View all users →",
      manageUsers: "View and manage all users",
      adminUsers: "Admin Users",
      regularUsers: "Regular Users",
      progress: "Progress",
      quizzes: "Quizzes",
      editCourse: "Edit Course",
      deleteCourseConfirm: "Delete this course?",
      deleteLessonConfirm: "Delete this lesson?",
      contentMarkdown: "Content (Markdown)",
      module: "Module",
      lesson: "Lesson",
    },
    lesson: {
      markComplete: "✓ Mark as Complete",
      saving: "Saving...",
      lessonCompleted: "Lesson Completed!",
      quizTitle: "📝",
      passingScore: "Passing score",
      submitting: "Submitting...",
      submitQuiz: "Submit Quiz",
      tryAgain: "Try Again",
      continueNext: "Continue to Next Lesson →",
      lessonLocked: "Lesson Locked",
      unlockMessage: "Complete the previous lesson to unlock this lesson.",
      goToPrevious: "Go to Previous Lesson",
      dashboard: "Dashboard",
      minRead: "min read",
      congratulations: "Congratulations!",
      keepLearning: "Keep Learning!",
      yourScore: "Your score",
      previous: "← Previous",
      next: "Next →",
      question: "Question",
      example: "Example",
      close: "Close",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "id" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
