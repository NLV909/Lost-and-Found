import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Search, Upload, Bell, CheckCircle, FileText, Smartphone, Shirt, Watch, PawPrint, Package, Send } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface Listing {
  id: number;
  type: 'lost' | 'found';
  category: string;
  title: string;
  location: string;
  date: string;
  image: string;
}

const mockListings: Listing[] = [
  {
    id: 1,
    type: 'lost',
    category: 'documents',
    title: 'Паспорт на имя Иванов А.И.',
    location: 'Станция метро Чиланзар',
    date: '2026-02-18',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'
  },
  {
    id: 2,
    type: 'found',
    category: 'electronics',
    title: 'iPhone 13 Pro в синем чехле',
    location: 'Парк Навои',
    date: '2026-02-17',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400'
  },
  {
    id: 3,
    type: 'lost',
    category: 'accessories',
    title: 'Золотое кольцо с камнем',
    location: 'ТРЦ Next',
    date: '2026-02-16',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400'
  },
  {
    id: 4,
    type: 'found',
    category: 'pets',
    title: 'Черная кошка с белыми лапками',
    location: 'Мирабадский район',
    date: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'
  },
  {
    id: 5,
    type: 'lost',
    category: 'clothing',
    title: 'Кожаная куртка черного цвета',
    location: 'Кафе Bon!',
    date: '2026-02-14',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'
  },
  {
    id: 6,
    type: 'found',
    category: 'accessories',
    title: 'Спортивная сумка Nike',
    location: 'Фитнес-клуб',
    date: '2026-02-13',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
  },
];

export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      documents: <FileText className="w-5 h-5" />,
      electronics: <Smartphone className="w-5 h-5" />,
      clothing: <Shirt className="w-5 h-5" />,
      accessories: <Watch className="w-5 h-5" />,
      pets: <PawPrint className="w-5 h-5" />,
      other: <Package className="w-5 h-5" />,
    };
    return icons[category] || icons.other;
  };

  // Filter listings based on selected filter
  const filteredListings = mockListings.filter(listing => {
    if (filter === 'all') return true;
    return listing.type === filter;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Lost & Found</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
              {t('heroSubtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4 mb-6 md:mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 md:h-14 bg-white border-2"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg"
                onClick={() => navigate('/submit?type=lost')}
                style={{ backgroundColor: 'var(--orange)', color: 'white' }}
                className="hover:opacity-90 text-base md:text-lg px-6 md:px-8"
              >
                {t('iLost')}
              </Button>
              <Button 
                size="lg"
                onClick={() => navigate('/submit?type=found')}
                style={{ backgroundColor: 'var(--blue)', color: 'white' }}
                className="hover:opacity-90 text-base md:text-lg px-6 md:px-8"
              >
                {t('iFound')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{t('latestListings')}</h2>
          <Button variant="link" className="text-primary">
            {t('viewAll')} →
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? '' : 'hover:bg-accent'}
          >
            {t('showAll')}
          </Button>
          <Button
            variant={filter === 'lost' ? 'default' : 'outline'}
            onClick={() => setFilter('lost')}
            style={filter === 'lost' ? { backgroundColor: 'var(--orange)', color: 'white' } : {}}
            className={filter === 'lost' ? 'hover:opacity-90' : 'hover:bg-accent'}
          >
            {t('showLost')}
          </Button>
          <Button
            variant={filter === 'found' ? 'default' : 'outline'}
            onClick={() => setFilter('found')}
            style={filter === 'found' ? { backgroundColor: 'var(--blue)', color: 'white' } : {}}
            className={filter === 'found' ? 'hover:opacity-90' : 'hover:bg-accent'}
          >
            {t('showFound')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  listing.type === 'lost' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {listing.type === 'lost' ? t('lost') : t('found')}
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  {getCategoryIcon(listing.category)}
                  <span className="text-sm">{t(listing.category)}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">{listing.location}</p>
                <p className="text-xs text-muted-foreground mt-1">{listing.date}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t('contact')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorksTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10" style={{ color: 'var(--orange)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('step1Title')}</h3>
              <p className="text-muted-foreground">{t('step1Desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10" style={{ color: 'var(--blue)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('step2Title')}</h3>
              <p className="text-muted-foreground">{t('step2Desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('step3Title')}</h3>
              <p className="text-muted-foreground">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Bot Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-3xl font-bold mb-4">{t('telegramBotTitle')}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{t('telegramBotDesc')}</p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg"
              style={{ backgroundColor: 'var(--blue)', color: 'white' }}
              className="hover:opacity-90"
              onClick={() => window.open('https://t.me/LostFoundAgentBot', '_blank')}
            >
              <Send className="w-5 h-5 mr-2" />
              {t('goToBot')}
            </Button>
           
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{t('mapTitle')}</h2>
          <div className="max-w-5xl mx-auto h-96 bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-muted-foreground">Интерактивная карта с местами находок</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}