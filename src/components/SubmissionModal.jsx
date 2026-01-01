import { useState } from 'react';
import { X, Send, CheckCircle, Plus, Trash2, Globe, Twitter, Mail } from 'lucide-react';
import { categories } from '../constants/categories';

const SubmissionModal = ({ isOpen, onClose }) => {
    const [contact, setContact] = useState({ email: '', twitter: '' });
    const [resources, setResources] = useState([
        { url: '', category: 'Education', description: '' }
    ]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // 🛡️ SECURITY: Basic obfuscation to prevent simple scrapers from grabbing the ID.
    // The ID 'maqnqbpk' is base64 encoded.
    const ENDPOINT_SECRET = 'bWFxbnFicGs=';

    if (!isOpen) return null;

    const handleAddResource = () => {
        setResources([...resources, { url: '', category: 'Education', description: '' }]);
    };

    const handleRemoveResource = (index) => {
        const newResources = resources.filter((_, i) => i !== index);
        setResources(newResources);
    };

    const handleResourceChange = (index, field, value) => {
        const newResources = [...resources];
        newResources[index][field] = value;
        setResources(newResources);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Decode the ID at runtime
        const formId = atob(ENDPOINT_SECRET);
        const endpoint = `https://formspree.io/f/${formId}`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({
                    _subject: `New Web3 Submission (${resources.length} items)`,
                    email: contact.email,
                    twitter: contact.twitter,
                    resources: resources,
                    // Honeypot field for bots (Formspree ignores this if empty, blocks if filled by bots)
                    _gotcha: ''
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSubmitted(true);
                setResources([{ url: '', category: 'Education', description: '' }]);
                setContact({ email: '', twitter: '' });
            } else {
                const data = await response.json();
                setError(data.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
            <div
                className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-[#0a0a0c] z-10">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Plus className="text-[#22c55e]" size={20} />
                            Submit Resources
                        </h2>
                        <p className="text-slate-500 text-[11px] font-medium tracking-wide">
                            Contribute to the archive. Bulk submissions supported.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable Content */}
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto scrollbar-hide">

                        {/* Contact Section */}
                        <div className="p-6 bg-slate-900/20 border-b border-slate-800/50 space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>
                                Contributor Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-2.5 text-slate-600 group-focus-within:text-slate-300 transition-colors" size={14} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Your Email (Required)"
                                        className="w-full bg-[#0a0a0c] border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 focus:outline-none focus:border-slate-600 transition-colors placeholder:text-slate-600"
                                        value={contact.email}
                                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <Twitter className="absolute left-3 top-2.5 text-slate-600 group-focus-within:text-slate-300 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Twitter Handle (Optional)"
                                        className="w-full bg-[#0a0a0c] border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 focus:outline-none focus:border-slate-600 transition-colors placeholder:text-slate-600"
                                        value={contact.twitter}
                                        onChange={(e) => setContact({ ...contact, twitter: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Resources Section */}
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                                    Resources ({resources.length})
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {resources.map((res, index) => (
                                    <div key={index} className="relative bg-[#0a0a0c] border border-slate-800 rounded-xl p-4 group transition-all hover:border-slate-700">
                                        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {resources.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveResource(index)}
                                                    className="text-slate-600 hover:text-red-500 transition-colors"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-8 space-y-3">
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-2.5 text-slate-600" size={14} />
                                                    <input
                                                        type="url"
                                                        required
                                                        placeholder="Resource URL (e.g. https://cool-tool.xyz)"
                                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#0a0a0c] transition-colors placeholder:text-slate-600"
                                                        value={res.url}
                                                        onChange={(e) => handleResourceChange(index, 'url', e.target.value)}
                                                    />
                                                </div>
                                                <textarea
                                                    rows="1"
                                                    placeholder="Short description... (What is this?)"
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 px-4 text-xs text-slate-200 focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#0a0a0c] transition-colors placeholder:text-slate-600 min-h-[40px] resize-none"
                                                    value={res.description}
                                                    onChange={(e) => handleResourceChange(index, 'description', e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">Category</label>
                                                <div className="space-y-1">
                                                    {categories.filter(c => c !== 'All').map(cat => (
                                                        <label key={cat} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${res.category === cat ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700'}`}>
                                                            <input
                                                                type="radio"
                                                                name={`category-${index}`}
                                                                value={cat}
                                                                checked={res.category === cat}
                                                                onChange={(e) => handleResourceChange(index, 'category', e.target.value)}
                                                                className="hidden"
                                                            />
                                                            <span className="text-[10px] font-bold uppercase tracking-wider">{cat}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleAddResource}
                                className="w-full py-3 border border-dashed border-slate-800 rounded-xl text-xs font-bold text-slate-500 hover:text-[#22c55e] hover:border-[#22c55e]/30 hover:bg-[#22c55e]/5 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                            >
                                <Plus size={14} /> Add Another Resource
                            </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-slate-800 bg-[#0a0a0c]">
                            {error && (
                                <div className="mb-4 text-center">
                                    <p className="text-red-500 text-xs font-bold bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-[#0a0a0c] font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-3 h-3 border-2 border-[#0a0a0c]/30 border-t-[#0a0a0c] rounded-full animate-spin"></div>
                                        Sending...
                                    </span>
                                ) : (
                                    <>Submit {resources.length} Resource{resources.length > 1 ? 's' : ''} <Send size={14} /></>
                                )}
                            </button>
                        </div>

                    </form>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300 min-h-[400px]">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#22c55e]/20 to-transparent flex items-center justify-center mb-6 border border-[#22c55e]/20">
                            <CheckCircle size={40} className="text-[#22c55e]" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Received!</h3>
                        <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                            Thank you for contributing to the archive.<br />We will review and list your submission soon.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 transition-colors uppercase tracking-widest"
                        >
                            Return to Archive
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionModal;
