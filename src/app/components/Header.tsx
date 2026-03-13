import { Link, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Globe, Menu, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import { useState } from 'react';

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl">🔍</div>
            <span className="text-lg md:text-xl font-semibold text-foreground">
              {t('siteName')}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/how-it-works" 
              className={`hover:text-primary transition-colors ${isActive('/how-it-works') ? 'text-primary' : 'text-foreground'}`}
            >
              {t('howItWorks')}
            </Link>
            <Link 
              to="/" 
              className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground'}`}
            >
              {t('home')}
            </Link>
            <Link to="/submit">
              <Button style={{ backgroundColor: 'var(--orange)', color: 'white' }} className="hover:opacity-90">
                {t('submitListingTitle')}
              </Button>
            </Link>
            <Link 
              to="/login" 
              className={`hover:text-primary transition-colors ${isActive('/login') ? 'text-primary' : 'text-foreground'}`}
            >
              {t('login')}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <Globe className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setLanguage('ru')}
                  className={language === 'ru' ? 'bg-accent' : ''}
                >
                  <span className="flex items-center justify-between w-full">
                    <span>Русский</span>
                    {language === 'ru' && <Check className="h-4 w-4 ml-2" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('uz')}
                  className={language === 'uz' ? 'bg-accent' : ''}
                >
                  <span className="flex items-center justify-between w-full">
                    <span>O'zbek</span>
                    {language === 'uz' && <Check className="h-4 w-4 ml-2" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-accent' : ''}
                >
                  <span className="flex items-center justify-between w-full">
                    <span>English</span>
                    {language === 'en' && <Check className="h-4 w-4 ml-2" />}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/how-it-works" 
                    onClick={() => setOpen(false)}
                    className={`text-lg hover:text-primary transition-colors ${isActive('/how-it-works') ? 'text-primary' : 'text-foreground'}`}
                  >
                    {t('howItWorks')}
                  </Link>
                  <Link 
                    to="/" 
                    onClick={() => setOpen(false)}
                    className={`text-lg hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground'}`}
                  >
                    {t('home')}
                  </Link>
                  <Link to="/submit" onClick={() => setOpen(false)}>
                    <Button style={{ backgroundColor: 'var(--orange)', color: 'white' }} className="hover:opacity-90 w-full">
                      {t('submitListingTitle')}
                    </Button>
                  </Link>
                  <Link 
                    to="/login" 
                    onClick={() => setOpen(false)}
                    className={`text-lg hover:text-primary transition-colors ${isActive('/login') ? 'text-primary' : 'text-foreground'}`}
                  >
                    {t('login')}
                  </Link>
                  
                  {/* Language Selector in Mobile Menu */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Language / Til / Язык</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={language === 'ru' ? 'default' : 'outline'}
                        onClick={() => setLanguage('ru')}
                        className="w-full justify-between"
                      >
                        <span>Русский</span>
                        {language === 'ru' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant={language === 'uz' ? 'default' : 'outline'}
                        onClick={() => setLanguage('uz')}
                        className="w-full justify-between"
                      >
                        <span>O'zbek</span>
                        {language === 'uz' && <Check className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        onClick={() => setLanguage('en')}
                        className="w-full justify-between"
                      >
                        <span>English</span>
                        {language === 'en' && <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}