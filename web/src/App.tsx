import { useState, useEffect } from 'react';
import { Github, Download, Languages, User, Hash, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const translations = {
  zh: {
    title: 'MobaXterm 密钥生成器',
    subtitle: '为您的 MobaXterm 专业版生成许可证密钥',
    nameLabel: '用户名',
    namePlaceholder: '输入授权用户名',
    versionLabel: '版本号',
    versionPlaceholder: '例如: 25.2',
    countLabel: '用户数量',
    countPlaceholder: '授权用户数',
    generateBtn: '生成并下载密钥',
    githubLink: '在 GitHub 上查看',
    successMsg: '密钥生成成功，正在开始下载...',
    errorMsg: '生成失败，请检查输入参数',
    professional: '专业版',
    securityNote: '所有生成过程均在本地或安全服务器完成',
  },
  en: {
    title: 'MobaXterm Keygen',
    subtitle: 'Generate license keys for MobaXterm Professional',
    nameLabel: 'Username',
    namePlaceholder: 'Enter authorized username',
    versionLabel: 'Version',
    versionPlaceholder: 'e.g., 25.2',
    countLabel: 'User Count',
    countPlaceholder: 'Number of users',
    generateBtn: 'Generate & Download',
    githubLink: 'View on GitHub',
    successMsg: 'Key generated successfully, downloading...',
    errorMsg: 'Generation failed, please check inputs',
    professional: 'Professional',
    securityNote: 'Generation is processed locally or on secure servers',
  }
};

type Lang = 'zh' | 'en';

function App() {
  const [lang, setLang] = useState<Lang>('zh');
  const [formData, setFormData] = useState({
    name: '',
    ver: '25.2',
    count: '1'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('pref-lang') as Lang;
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    localStorage.setItem('pref-lang', newLang);
  };

  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Construct the URL for the download
    const params = new URLSearchParams({
      name: formData.name,
      ver: formData.ver,
      count: formData.count
    });
    
    const url = `./gen?${params.toString()}`;
    
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Custom.mxtpro');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">MxtGen</span>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-medium text-slate-600"
          >
            <Languages className="w-4 h-4" />
            {lang === 'zh' ? 'English' : '中文'}
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-8 pb-0">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h1>
            <p className="text-slate-500 text-sm leading-relaxed">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Version Input */}
                <div className="space-y-2">
                  <label htmlFor="ver" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" />
                    {t.versionLabel}
                  </label>
                  <input
                    type="text"
                    id="ver"
                    required
                    placeholder={t.versionPlaceholder}
                    value={formData.ver}
                    onChange={(e) => setFormData({ ...formData, ver: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  />
                </div>

                {/* Count Input */}
                <div className="space-y-2">
                  <label htmlFor="count" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400" />
                    {t.countLabel}
                  </label>
                  <input
                    type="number"
                    id="count"
                    required
                    min="1"
                    max="999"
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t.generateBtn}
                </>
              )}
            </button>

            <div className="pt-2">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <p className="text-[11px] text-emerald-700 leading-tight">
                  {t.securityNote}
                </p>
              </div>
            </div>
          </form>

          <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-6">
            <a
              href="https://github.com/malaohu/MobaXterm-GenKey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              {t.githubLink}
            </a>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              v25.2
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400 text-[11px] uppercase tracking-widest font-semibold">
          Developed by Engineering Collaborator
        </p>
      </div>
    </div>
  );
}

export default App;
