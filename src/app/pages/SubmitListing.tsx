import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Upload } from 'lucide-react';

export function SubmitListing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');
  
  const [formData, setFormData] = useState({
    type: typeFromUrl || 'lost',
    category: '',
    title: '',
    description: '',
    location: '',
    phone: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Объявление успешно размещено!');
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold mb-8">{t('submitListingTitle')}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Listing Type */}
              <div className="space-y-3">
                <Label>{t('listingType')}</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lost" id="lost" />
                    <Label htmlFor="lost" className="cursor-pointer font-normal">
                      {t('lost')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="found" id="found" />
                    <Label htmlFor="found" className="cursor-pointer font-normal">
                      {t('found')}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label htmlFor="category">{t('category')}</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category" className="bg-white">
                    <SelectValue placeholder={t('selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documents">{t('documents')}</SelectItem>
                    <SelectItem value="electronics">{t('electronics')}</SelectItem>
                    <SelectItem value="clothing">{t('clothing')}</SelectItem>
                    <SelectItem value="accessories">{t('accessories')}</SelectItem>
                    <SelectItem value="pets">{t('pets')}</SelectItem>
                    <SelectItem value="other">{t('other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <Label htmlFor="title">{t('title')}</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder={t('titlePlaceholder')}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description">{t('description')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                  className="bg-white"
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label htmlFor="location">{t('location')}</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder={t('locationPlaceholder')}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('phonePlaceholder')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-3">
                <Label htmlFor="photo">{t('uploadPhoto')}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-white hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    {selectedFile ? (
                      <p className="text-sm text-foreground">{selectedFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-1">
                          Нажмите для загрузки фото
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG до 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg"
                className="w-full text-lg"
                style={{ backgroundColor: 'var(--orange)', color: 'white' }}
              >
                {t('submitButton')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
