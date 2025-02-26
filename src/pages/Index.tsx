
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap, BookOpen, MessageSquare, Target, Timer, Users, Smartphone, Apple, Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Medical Focus and Notice Board */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Hero Content */}
            <div className="lg:col-span-2 text-left">
              <span className="inline-block animate-fade-in opacity-0 [--delay:200ms] py-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                #1 Medical Entrance Preparation Institute in Nepal
              </span>
              <h1 className="animate-fade-in opacity-0 [--delay:400ms] text-4xl md:text-6xl font-bold text-neutral-800 mb-6 leading-tight">
                Your Path to <br/>Medical Success
              </h1>
              <p className="animate-fade-in opacity-0 [--delay:600ms] text-lg text-neutral-600 max-w-2xl mb-8">
                Comprehensive MBBS entrance exam preparation with expert guidance, proven study materials, and the highest success rate in Nepal.
              </p>
              <div className="animate-fade-in opacity-0 [--delay:800ms] flex flex-wrap gap-4">
                <Button 
                onClick={() => window.location.href = '/courses'}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-xl">
                  Start Your Journey
                </Button>
                <Button 
                onClick={() => window.location.href = '/contact'}
                variant="outline" className="px-8 py-6 rounded-xl">
                  Book Free Counseling
                </Button>
              </div>
            </div>

            {/* Notice Board - Optimized */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-2 h-[400px]">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-800">Notice Board</h2>
                    <Link to="/news" className="flex items-center gap-1 text-primary hover:text-primary-hover text-sm font-medium group">
                      View All 
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-3">
                      {updates.map((update, index) => (
                        <div 
                          key={index} 
                          className={`relative border-l-4 pl-4 py-3 ${
                            update.type === 'urgent' ? 'border-l-red-500' : 'border-l-primary'
                          } animate-fade-in opacity-0 hover:bg-neutral-50 rounded-r-lg transition-colors`}
                          style={{ '--delay': `${(index + 4) * 200}ms` } as React.CSSProperties}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`p-1.5 rounded-full ${
                              update.type === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'
                            }`}>
                              <Bell className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-sm truncate">{update.title}</h3>
                                {update.type === 'urgent' && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full whitespace-nowrap">
                                    Urgent
                                  </span>
                                )}
                              </div>
                              <p className="text-neutral-600 text-xs line-clamp-2 mt-1">
                                {update.description}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-neutral-500">{update.date}</span>
                                {update.link && (
                                  <Link to={update.link} className="text-xs text-primary hover:underline">
                                    Learn more →
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics - Optimized */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Optimized */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
          <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
            Experience the most comprehensive medical entrance preparation program in Nepal
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Study On The Go Section - Optimized */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Learning
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Study Anytime, Anywhere</h2>
              <p className="text-lg text-neutral-600">
                Access your study materials, take practice tests, and track your progress on the go. 
                Our mobile app is designed to make your learning journey seamless and efficient.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {appFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-sm">{feature.title}</h3>
                      <p className="text-xs text-neutral-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={() => window.location.href = 'https://apps.apple.com/us/app/name-online/id1524191391'}
                  variant="outline"
                  className="bg-black text-white border-white hover:bg-white hover:text-black rounded-xl"
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Download for iOS
                </Button>
                <Button
                  onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.avyaas.nameonline&hl=en_US'}
                  variant="outline"
                  className="bg-black text-white border-white hover:bg-white hover:text-black rounded-xl"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download for Android
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-white shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="Images/name-app1.png" 
                      alt="Mobile App Preview" 
                      className="w-64 h-auto object-contain transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Courses</h2>
          <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
          Comprehensive courses designed to help you excel in your academic journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingBatches.map((batch, index) => (
              <Card key={index} className="p-6 border-2 border-primary/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{batch.name}</h3>
                    <p className="text-neutral-600">{batch.timing}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {batch.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-neutral-600">
                      <BookOpen className="w-4 h-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Learn More</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const stats = [
  { value: "10,000+", label: "Success Stories" },
  { value: "95%", label: "Selection Rate" },
  { value: "50+", label: "Expert Faculty" },
  { value: "20+", label: "Years Experience" },
];

const features = [
  {
    icon: GraduationCap,
    title: "Expert Medical Faculty",
    description: "Learn from experienced medical professionals and top educators.",
  },
  {
    icon: Target,
    title: "Focused Preparation",
    description: "Specialized coaching for MBBS entrance exams with proven methods.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Materials",
    description: "Access detailed study materials aligned with the latest syllabus.",
  },
  {
    icon: Timer,
    title: "Regular Mock Tests",
    description: "Practice with exam-pattern questions and get detailed analysis.",
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description: "Personalized attention with limited students per batch.",
  },
  {
    icon: MessageSquare,
    title: "Doubt Clearing Sessions",
    description: "Regular sessions to resolve your queries and difficulties.",
  },
];

const appFeatures = [
  {
    icon: BookOpen,
    title: "Complete Study Materials",
    description: "Access comprehensive notes, video lectures, and practice questions."
  },
  {
    icon: Target,
    title: "Practice Tests & Analytics",
    description: "Take mock tests and get detailed performance analysis."
  },
  {
    icon: Timer,
    title: "Progress Tracking",
    description: "Monitor your study progress and identify improvement areas."
  },
  {
    icon: MessageSquare,
    title: "Doubt Resolution",
    description: "Get your queries resolved by expert faculty members."
  }
];

const updates = [
  {
    type: 'urgent',
    title: 'MBBS Entrance Mock Test Schedule',
    description: 'The next mock test series for MBBS entrance preparation starts from March 25th. Register now to secure your spot.',
    date: 'March 20, 2024',
    link: '/mock-tests'
  },
  {
    type: 'normal',
    title: 'New Study Materials Available',
    description: 'Updated Physics and Chemistry study materials have been uploaded to the student portal.',
    date: 'March 19, 2024',
    link: '/study-materials'
  },
  {
    type: 'normal',
    title: 'Counseling Session',
    description: 'Special counseling session for medical aspirants scheduled for this weekend.',
    date: 'March 18, 2024',
    link: '/events'
  },
  {
    type: 'urgent',
    title: 'Scholarship Test Announcement',
    description: 'Annual scholarship test for deserving students will be conducted on April 5th.',
    date: 'March 17, 2024',
    link: '/scholarship'
  },
  {
    type: 'normal',
    title: 'Faculty Addition',
    description: 'Welcome Dr. Sarah Johnson, our new Biology faculty member with 15 years of teaching experience.',
    date: 'March 16, 2024'
  }
];

const upcomingBatches = [
  {
    name: "Medical Entrance",
    timing: "Comprehensive preparation for medical field entrances",
    features: [
      "MBBS",
      "BDS",
      "BSc Nursing",
      "BPH",
      "B Pharmacy",
    ],
  },
  {
    name: "Allied Health Sciences",
    timing: "Specialized preparation for health science programs",
    features: [
      "B Optometry",
      "BPT",
      "BASLP",
      "BMIT",
      "BMLT",
    ],
  },
  {
    name: "Agriculture & Technology",
    timing: "Expert guidance for technical and agricultural entrances",
    features: [
      "B Tech",
      "B Forestry",
      "B Veterinary",
      "BSc Agriculture",
    ],
  },
];

export default Index;
