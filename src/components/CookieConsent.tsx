
import { useState, useEffect } from "react";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const COOKIE_CONSENT_KEY = "cookie-consent-status";

type CookieSettings = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true, // Essential cookies are always required
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (!consentStatus) {
      // Wait a second before showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // If there's a saved preference, parse and restore it
    if (consentStatus) {
      try {
        const savedSettings = JSON.parse(consentStatus);
        if (savedSettings && typeof savedSettings === 'object') {
          setSettings(savedSettings);
        }
      } catch (error) {
        console.error("Error parsing saved cookie preferences:", error);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookieSettings = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(settings);
  };
  
  const acceptEssentialOnly = () => {
    const essentialOnly: CookieSettings = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    saveConsent(essentialOnly);
  };

  const saveConsent = (cookieSettings: CookieSettings) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(cookieSettings));
    setIsVisible(false);
    
    // Here you would usually enable the corresponding cookies/tracking based on user choice
    console.log("Cookie preferences saved:", cookieSettings);
  };
  
  const handleSettingChange = (type: keyof CookieSettings) => {
    if (type === 'essential') return; // Cannot change essential cookies
    
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t p-4 md:p-6 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
            <p className="text-neutral-600 mb-4">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
              Visit our <Link to="/cookie-policy" className="text-primary underline">Cookie Policy</Link> to learn more.
            </p>
            
            <Collapsible 
              open={isCustomizeOpen} 
              onOpenChange={setIsCustomizeOpen}
              className="mb-4"
            >
              <CollapsibleTrigger asChild>
                <button
                  className="flex items-center gap-1 text-sm text-primary"
                >
                  {isCustomizeOpen ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide cookie settings
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Customize cookie settings
                    </>
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                <div className="p-4 border rounded-lg bg-neutral-50">
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="essential" 
                      checked={settings.essential} 
                      disabled
                    />
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="essential"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Essential Cookies <span className="text-xs text-neutral-500">(Required)</span>
                      </label>
                      <p className="text-sm text-neutral-500">
                        These cookies are necessary for the website to function and cannot be switched off in our systems.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-neutral-50">
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="analytics" 
                      checked={settings.analytics}
                      onCheckedChange={() => handleSettingChange('analytics')}
                    />
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="analytics"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Analytics Cookies
                      </label>
                      <p className="text-sm text-neutral-500">
                        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-neutral-50">
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="marketing" 
                      checked={settings.marketing}
                      onCheckedChange={() => handleSettingChange('marketing')}
                    />
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="marketing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Marketing Cookies
                      </label>
                      <p className="text-sm text-neutral-500">
                        These cookies may be set through our site by our advertising partners to build a profile of your interests.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-neutral-50">
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="preferences" 
                      checked={settings.preferences}
                      onCheckedChange={() => handleSettingChange('preferences')}
                    />
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="preferences"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Preferences Cookies
                      </label>
                      <p className="text-sm text-neutral-500">
                        These cookies enable the website to provide enhanced functionality and personalization.
                      </p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={acceptEssentialOnly}
              >
                Reject All
              </Button>
              {isCustomizeOpen && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={acceptSelected}
                >
                  Save Preferences
                </Button>
              )}
              <Button
                size="sm"
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
          
          <button
            onClick={acceptEssentialOnly}
            className="p-1.5 text-neutral-400 hover:text-neutral-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
