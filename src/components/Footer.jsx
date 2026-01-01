import { Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 pt-8 border-t border-slate-900/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.3em]">
        <p className="text-[#22c55e] drop-shadow(0 0 5px rgba(34,197,94,0.4))">
          © 2026 WEB3RESOURCES
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/martix31337"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#22c55e] hover:text-[#16a34a] transition-colors"
            title="Follow on Twitter @martix31337"
          >
            <Twitter size={14} />
            <span className="text-[10px] tracking-wider uppercase font-bold">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
