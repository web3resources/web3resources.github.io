import { 
  BookOpen, 
  Shield, 
  Newspaper, 
  Microscope, 
  Terminal, 
  Layers 
} from 'lucide-react';

export const getCategoryIcon = (cat) => {
  switch(cat) {
    case 'Education': return <BookOpen size={16} />;
    case 'Audit': return <Shield size={16} />;
    case 'News/Analysis': return <Newspaper size={16} />;
    case 'Research': return <Microscope size={16} />;
    case 'Labs': return <Terminal size={16} />;
    default: return <Layers size={16} />;
  }
};

