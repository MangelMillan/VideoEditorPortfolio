import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface PageHeaderProps {
  title: string;
  backLink: string;
  backText: string;
}

export function PageHeader({ title, backLink, backText }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 pt-20">
      <Link 
        href={backLink}
        className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
      >
        <IoMdArrowRoundBack className="w-6 h-6" />
        <span>{backText}</span>
      </Link>
      <h1 className="text-4xl font-bold text-center flex-1">{title}</h1>
      <div className="w-[150px]"></div>
    </div>
  );
} 