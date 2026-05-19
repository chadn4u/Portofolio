import type { Lang } from '@/context/LanguageContext'

export function t<T>(obj: { id: T; en: T }, lang: Lang): T {
  return obj[lang]
}

export const i18n = {
  nav: {
    cta:    { id: './connect.sh →',   en: './connect.sh →' },
    home:   { id: 'home',             en: 'home' },
    about:  { id: 'about',            en: 'about' },
    stack:  { id: 'stack',            en: 'stack' },
    projects:{ id: 'projects',        en: 'projects' },
    contact:{ id: 'contact',          en: 'contact' },
  },

  hero: {
    badge:  { id: 'SYSTEM ONLINE · TERSEDIA Q3/2026',  en: 'SYSTEM ONLINE · AVAILABLE Q3/2026' },
    role:   { id: '> role: ',                           en: '> role: ' },
    lede:   {
      id: 'Versatile Full-Stack Engineer dengan <b>8+ tahun</b> pengalaman membangun scalable web, mobile & AI-integrated systems. Spesialisasi: <b>Next.js/React frontends</b>, <b>Node.js/FastAPI backends</b>, dengan solid expertise di <b>PostgreSQL, Redis, Supabase</b>, dan third-party API integrations.',
      en: 'Versatile Full-Stack Engineer with <b>8+ years</b> building scalable web, mobile & AI-integrated systems. Specialized in <b>Next.js/React frontends</b>, <b>Node.js/FastAPI backends</b>, with solid expertise in <b>PostgreSQL, Redis, Supabase</b>, and third-party API integrations.',
    },
    cta1:   { id: 'view_projects()',   en: 'view_projects()' },
    cta2:   { id: 'download_cv.pdf',  en: 'download_cv.pdf' },
    statLabels: {
      id: ['Years_Shipping', 'Projects_Delivered', 'K_Users_Served', 'Uptime_Pct'],
      en: ['Years_Shipping', 'Projects_Delivered', 'K_Users_Served', 'Uptime_Pct'],
    },
    terminal: {
      focus: {
        id: '["Full-Stack", "AI", "E-commerce"]',
        en: '["Full-Stack", "AI", "E-commerce"]',
      },
    },
  },

  about: {
    eyebrow: { id: '02 / Tentang',   en: '02 / About' },
    title1:  { id: 'Engineer yang',  en: 'Engineer who' },
    em1:     { id: 'nge-ship,',      en: 'ships,' },
    title2:  { id: 'bukan cuma',     en: 'not just' },
    em2:     { id: 'nge-talk.',      en: 'talks.' },
    p1: {
      id: 'Versatile Full-Stack Engineer dengan <b>8+ tahun</b> pengalaman membangun scalable web, mobile & AI-integrated systems. Spesialisasi di <b>Next.js/React frontends</b> dan <b>Node.js/FastAPI backends</b>, dengan solid expertise di <b>PostgreSQL, Redis, Supabase</b>, dan third-party API integrations.',
      en: 'Versatile Full-Stack Engineer with <b>8+ years</b> building scalable web, mobile & AI-integrated systems. Specialized in <b>Next.js/React frontends</b> and <b>Node.js/FastAPI backends</b>, with solid expertise in <b>PostgreSQL, Redis, Supabase</b>, and third-party API integrations.',
    },
    p2: {
      id: 'Berpengalaman dalam <b>end-to-end ownership</b> — dari UI/UX, backend API, payment integration, sampai DevOps di production. Pernah bangun <b>loyalty app dengan 100K+ users</b>, <b>AI CS system dengan 83% token reduction</b>, cashless parking untuk Pemda, dan SaaS digital goods platform.',
      en: 'Experienced in <b>end-to-end ownership</b> — from UI/UX, backend API, payment integration, to production DevOps. Built a <b>loyalty app with 100K+ users</b>, an <b>AI CS system with 83% token reduction</b>, cashless parking for local government, and a digital goods SaaS platform.',
    },
    p3: {
      id: 'Strong focus pada <b>clean architecture</b>, <b>UI/UX quality</b>, dan <b>Core Web Vitals performance</b>. Gw suka ngebangun sistem yang tidak hanya jalan — tapi <em style="color:var(--cy);font-style:normal">scale dan deliver measurable impact</em>.',
      en: 'Strong focus on <b>clean architecture</b>, <b>UI/UX quality</b>, and <b>Core Web Vitals performance</b>. I love building systems that don\'t just work — they <em style="color:var(--cy);font-style:normal">scale and deliver measurable impact</em>.',
    },
    stackFile: { id: './stack/proficiency.yml', en: './stack/proficiency.yml' },
    syncing:   { id: 'syncing',   en: 'syncing' },
  },

  projects: {
    eyebrow: { id: '04 / Featured Builds',   en: '04 / Featured Builds' },
    title:   { id: 'Selected',               en: 'Selected' },
    sub: {
      id: 'Beberapa sistem yang gw bangun & ship — production-grade, scalable, opinionated. Klik project untuk full case study.',
      en: 'A selection of systems I built & shipped — production-grade, scalable, opinionated. Click any project for a full case study.',
    },
    grid:     { id: 'grid_view',       en: 'grid_view' },
    list:     { id: 'terminal_list',   en: 'terminal_list' },
    caseStudy:{ id: 'case study',      en: 'case study' },
    role:     { id: 'role',            en: 'role' },
    year:     { id: 'year',            en: 'year' },
    duration: { id: 'duration',        en: 'duration' },
    client:   { id: 'client',          en: 'client' },
    problem:  { id: 'The Problem',     en: 'The Problem' },
    challenges:{ id: 'Engineering Challenges', en: 'Engineering Challenges' },
    outcomes: { id: 'Outcomes',        en: 'Outcomes' },
    fullStack:{ id: 'Full Stack',      en: 'Full Stack' },
    arch:     { id: 'Architecture',    en: 'Architecture' },
    liveDemo: { id: 'live_demo()',     en: 'live_demo()' },
    srcCode:  { id: 'source_code',    en: 'source_code' },
    lastUpdated:{ id: '// last_updated:', en: '// last_updated:' },
    users:    { id: 'users',           en: 'users' },
    uptime:   { id: 'uptime',          en: 'uptime' },
  },

  contact: {
    eyebrow:  { id: '05 / Kontak',   en: '05 / Contact' },
    title:    { id: 'Mari kita',      en: "Let's" },
    em:       { id: 'bangun sesuatu.', en: 'build something.' },
    sub: {
      id: 'Punya project di mind? Drop pesan — gw bales dalam 24 jam kerja.',
      en: "Have a project in mind? Drop a message — I'll reply within 24 business hours.",
    },
    termPath: { id: './kirim_pesan.sh',     en: './send_message.sh' },
    accepting:{ id: 'menerima pesan',       en: 'accepting input' },
    labelName:    { id: 'nama',             en: 'name' },
    labelEmail:   { id: 'email',            en: 'email' },
    labelSubject: { id: 'subjek',           en: 'subject' },
    labelMsg:     { id: 'pesan',            en: 'message' },
    phName:       { id: 'nama kamu',        en: 'your name' },
    phEmail:      { id: 'kamu@domain.com',  en: 'you@domain.com' },
    phSubject:    { id: 'ini tentang apa?', en: "what's this about?" },
    phMsg:        { id: '// pesan kamu di sini...', en: '// your message here...' },
    send:         { id: 'execute.kirim()',  en: 'execute.send()' },
    sending:      { id: '> mengirim...',    en: '> transmitting...' },
    sent:         { id: '✓ pesan terkirim · balasan dalam 24 jam kerja', en: '✓ message delivered · expect a reply within 24h' },
    error:        { id: '✗ gagal terkirim · coba lagi', en: '✗ transmission failed · try again' },
    netError:     { id: '✗ error jaringan · coba lagi', en: '✗ network error · try again' },
    locLabel:     { id: 'lokasi',           en: 'location' },
    availLabel:   { id: 'ketersediaan',     en: 'availability' },
    availVal:     { id: 'Sen–Jum · 09:00–18:00', en: 'Mon–Fri · 09:00–18:00' },
    respLabel:    { id: 'response_time',    en: 'response_time' },
    follow:       { id: '// ikuti',         en: '// follow' },
  },

  footer: {
    built: { id: '© 2025 Richard Mario · dibuat dengan kafein & rasa penasaran', en: '© 2025 Richard Mario · built with caffeine & curiosity' },
    uptime:{ id: 'uptime',      en: 'uptime' },
    deploy:{ id: 'last_deploy', en: 'last_deploy' },
    now:   { id: 'baru saja',   en: 'just now' },
  },
}
