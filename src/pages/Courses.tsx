
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/Layout";

// Course categories
const CATEGORIES = {
  MEDICAL: "Medical Entrance",
  ALLIED: "Allied Health Sciences",
  AGRICULTURE: "Agriculture & Technology"
};

// Add category to each course
const coursesWithCategories = [
  {
    title: "MBBS",
    category: CATEGORIES.MEDICAL,
    shortDescription: "Intensive coaching for MBBS entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          In Nepal, securing admission into medical schools for MBBS is highly competitive. Our MBBS preparation course offers a structured and comprehensive approach to mastering key subjects such as Physics, Chemistry, and Biology. With expert faculty and customized study materials, students are equipped with the knowledge and problem-solving techniques essential to succeed in entrance exams.
        </p>
        <p className="mb-4">
          We focus on strengthening the core concepts through rigorous practice and mock tests. The course is designed to help students enhance their problem-solving abilities, manage time effectively during exams, and improve their exam-taking strategies. We ensure that each student is able to apply theoretical knowledge in practical scenarios, preparing them for real-world medical challenges.
        </p>
        <p className="mb-4">
          Students will also have access to one-on-one mentoring sessions with experienced faculty members who provide personalized guidance and support. This allows students to address their weaknesses, clear doubts, and enhance their strengths to achieve success in the highly competitive MBBS entrance exams in Nepal.
        </p>
      </div>
    ),
    image: "/Images/mbbs.jpg"
  },
  {
    title: "BDS",
    category: CATEGORIES.MEDICAL,
    shortDescription: "Comprehensive course for BDS entrance exam success",
    longDescription: (
      <div>
        <p className="mb-4">
          Aspiring dentists in Nepal require a strong foundation in Biology, Chemistry, and Physics to clear the BDS entrance exams. Our BDS preparation course is meticulously designed to provide an in-depth understanding of these subjects. With detailed study materials, practice tests, and expert guidance, students are well-prepared for the tough entrance exams that lead to a career in dentistry.
        </p>
        <p className="mb-4">
          The course focuses on building a deep understanding of key concepts in dental sciences and applying that knowledge to solve complex problems. We offer regular mock tests and assignments to track progress and ensure that students stay on track. Personalized feedback helps identify weak areas and improve performance over time.
        </p>
        <p className="mb-4">
          In addition to the academic preparation, our course emphasizes practical training and clinical problem-solving skills. We prepare students for a career in dentistry, offering a holistic approach that ensures success in both entrance exams and future professional endeavors in the field of dental health.
        </p>
      </div>
    ),
    image: "/Images/bds.jpg"
  },
  {
    title: "BSc Nursing",
    category: CATEGORIES.ALLIED,
    shortDescription: "Structured preparation for BSc Nursing entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          For students aiming to pursue a career in nursing in Nepal, clearing the BSc Nursing entrance exam is a critical step. This course covers vital subjects such as Biology, Chemistry, and Nursing fundamentals. With structured study materials, practice tests, and interactive learning, students gain the essential knowledge required to excel in the entrance exam.
        </p>
        <p className="mb-4">
          We emphasize not just theoretical knowledge but also practical application in the healthcare environment. Regular interactive sessions, case studies, and group discussions ensure that students develop the critical thinking and clinical reasoning skills needed to succeed in their nursing careers.
        </p>
        <p className="mb-4">
          Additionally, the course provides personalized mentoring, enabling students to seek guidance, clarify doubts, and improve their understanding of nursing principles. We aim to build a strong foundation that will help students not only clear the entrance exams but also succeed in the nursing profession after they join their respective colleges in Nepal.
        </p>
      </div>
    ),
    image: "/Images/bsc-nursing.jpg"
  },
  {
    title: "BPH",
    category: CATEGORIES.ALLIED,
    shortDescription: "Coaching for Bachelor of Public Health (BPH) entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          The Bachelor of Public Health (BPH) entrance exams in Nepal demand a thorough understanding of Public Health fundamentals, Biology, and General Science. Our BPH coaching course is designed to help students master these areas, with a focus on the practical application of public health knowledge. Expert faculty members guide students through complex topics, ensuring that they can excel in both theory and application.
        </p>
        <p className="mb-4">
          Special emphasis is placed on critical thinking, case studies, and problem-solving, all of which are essential skills for a career in public health. We provide extensive practice tests and quizzes to track student progress and ensure that they are ready for the entrance exams. Students also gain valuable insights into public health issues that are relevant to Nepal and the world.
        </p>
        <p className="mb-4">
          Our interactive learning methods, combined with personalized guidance, ensure that every student is well-prepared for the competitive BPH entrance exams. With consistent support from our faculty and a comprehensive study approach, students will be ready to pursue their dream of working in public health.
        </p>
      </div>
    ),
    image: "/Images/bph.jpg"
  },
  {
    title: "B Pharmacy",
    category: CATEGORIES.ALLIED,
    shortDescription: "Specialized coaching for B Pharmacy aspirants",
    longDescription: (
      <div>
        <p className="mb-4">
          Our B Pharmacy preparation course is specifically designed for students aspiring to pursue a career in the pharmaceutical industry. With a focus on Pharmacology, Medicinal Chemistry, and Biology, this course prepares students for the B Pharmacy entrance exams in Nepal. Our expert faculty members provide in-depth explanations and help students build a solid understanding of pharmaceutical sciences.
        </p>
        <p className="mb-4">
          Through detailed study materials, practice tests, and hands-on problem-solving sessions, students develop a strong foundation in the core subjects. We emphasize the practical application of pharmaceutical knowledge, preparing students for real-world challenges in the field. Our approach ensures that students are confident in both theoretical and practical aspects of the B Pharmacy curriculum.
        </p>
        <p className="mb-4">
          In addition to academic preparation, our course includes interactive sessions and one-on-one mentorship to support students' growth. Personalized feedback and guidance allow students to improve their weaknesses and build upon their strengths, ensuring success in the entrance exams and in their future careers as pharmacists.
        </p>
      </div>
    ),
    image: "/Images/b-pharmacy.jpg"
  },
  {
    title: "B Optometry",
    category: CATEGORIES.ALLIED,
    shortDescription: "Focused preparation for Bachelor of Optometry entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          Aspiring optometrists in Nepal can benefit from our focused B Optometry entrance exam coaching. The course covers important topics such as Vision Science, Optics, and Human Anatomy. With expert guidance and a structured study plan, students are able to develop the necessary skills and knowledge to succeed in the entrance exams and pursue a career in optometry.
        </p>
        <p className="mb-4">
          Our teaching approach is interactive and hands-on, ensuring that students are able to apply theoretical concepts to practical scenarios. Practice tests, mock exams, and problem-solving sessions help students develop confidence and improve their exam-taking strategies. The course also emphasizes the development of critical thinking and diagnostic skills required in the optometry field.
        </p>
        <p className="mb-4">
          With personalized mentoring, students receive valuable feedback to refine their understanding and tackle any difficulties. This course is designed to ensure that students are not only prepared for the entrance exams but also well-equipped for success in the optometry profession in Nepal.
        </p>
      </div>
    ),
    image: "/Images/b-optometry.jpg"
  },
  {
    title: "BPT",
    category: CATEGORIES.ALLIED,
    shortDescription: "Intensive preparation for Bachelor of Physiotherapy (BPT) entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          Our BPT entrance exam preparation course is tailored to help students excel in subjects such as Human Anatomy, Kinesiology, and Rehabilitation Science. With a focus on practical application and clinical problem-solving, this course ensures that students gain the knowledge and skills needed to succeed in the BPT entrance exams in Nepal.
        </p>
        <p className="mb-4">
          The course offers in-depth study materials, practice sessions, and mock exams to help students master essential concepts. Expert faculty members provide personalized support to address individual learning needs, ensuring that students stay on track and are fully prepared for the competitive entrance exams.
        </p>
        <p className="mb-4">
          Additionally, our course includes hands-on learning opportunities, case studies, and clinical exercises to enhance students' understanding of physiotherapy techniques. This practical experience, combined with academic preparation, ensures that students are ready for both the entrance exams and the challenges of a career in physiotherapy.
        </p>
      </div>
    ),
    image: "/Images/bpt.jpg"
  },
  {
    title: "BASLP",
    category: CATEGORIES.ALLIED,
    shortDescription: "Guidance for Bachelor of Audiology and Speech-Language Pathology (BASLP) exams",
    longDescription: (
      <div>
        <p className="mb-4">
          The BASLP entrance exams in Nepal require a strong understanding of Speech Science, Audiology, and Neurology. Our comprehensive coaching program is designed to help students build a solid foundation in these critical areas. With expert faculty and detailed study materials, we prepare students for success in both theoretical and practical aspects of the BASLP exams.
        </p>
        <p className="mb-4">
          Through interactive learning, case studies, and practice tests, students develop essential skills in audiology and speech-language pathology. Our approach focuses on applying theoretical knowledge to real-world scenarios, ensuring that students are fully prepared for the challenges they will face in their careers.
        </p>
        <p className="mb-4">
          Personalized mentoring and feedback are key components of our BASLP preparation course. We work closely with each student to address their individual needs, clarify doubts, and help them improve their understanding of key concepts. With our support, students are well-prepared to excel in the entrance exams and pursue a successful career in audiology and speech-language pathology.
        </p>
      </div>
    ),
    image: "/Images/baslp.jpg"
  },
  {
    title: "BMIT",
    category: CATEGORIES.ALLIED,
    shortDescription: "Comprehensive coaching for Bachelor of Medical Imaging Technology (BMIT)",
    longDescription: (
      <div>
        <p className="mb-4">
          The BMIT entrance exams in Nepal require an in-depth understanding of Radiology, Imaging Techniques, and Medical Physics. Our comprehensive coaching program is designed to help students master these subjects, preparing them for success in the entrance exams and in their future careers as medical imaging technologists.
        </p>
        <p className="mb-4">
          With detailed study materials, practical sessions, and case studies, students gain a deep understanding of the technologies and techniques used in medical imaging. We emphasize practical application and problem-solving skills, ensuring that students are ready to face the challenges of medical imaging technology in the healthcare industry.
        </p>
        <p className="mb-4">
          Our expert faculty provides personalized guidance to each student, ensuring that they are well-prepared for both the entrance exams and the practical aspects of the BMIT curriculum. Regular mock exams and practice tests help track progress and ensure that students are fully prepared to excel.
        </p>
      </div>
    ),
    image: "/Images/bmit.jpg"
  },
  {
    title: "BMLT",
    category: CATEGORIES.ALLIED,
    shortDescription: "Expert guidance for Bachelor of Medical Laboratory Technology (BMLT)",
    longDescription: (
      <div>
        <p className="mb-4">
          The BMLT entrance exams in Nepal require a strong grasp of Biochemistry, Microbiology, and Laboratory Techniques. Our expert coaching program is designed to help students master these subjects, providing them with the knowledge and practical skills necessary to excel in the exams.
        </p>
        <p className="mb-4">
          The course includes comprehensive study materials, hands-on practice sessions, and regular mock tests to ensure that students are well-prepared. Our experienced faculty members provide personalized mentoring to address individual learning needs and help students improve their performance.
        </p>
        <p className="mb-4">
          In addition to academic preparation, the course also includes practical laboratory sessions where students can apply theoretical knowledge to real-world scenarios. This combination of theoretical and practical learning ensures that students are fully equipped for both the entrance exams and a successful career in medical laboratory technology.
        </p>
      </div>
    ),
    image: "/Images/bmlt.jpg"
  },
  {
    title: "B Tech",
    category: CATEGORIES.AGRICULTURE,
    shortDescription: "Focused coaching for Bachelor of Technology (B Tech) entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          The B Tech entrance exams in Nepal require a solid foundation in Mathematics, Physics, and Chemistry. Our focused coaching program helps students master these key subjects, providing in-depth explanations and practice sessions to ensure success in the entrance exams.
        </p>
        <p className="mb-4">
          We provide comprehensive study materials, problem-solving exercises, and regular mock exams to help students build the necessary skills and knowledge. Our expert faculty guides students through each topic, ensuring they are confident in their ability to tackle the entrance exams and succeed in their future engineering studies.
        </p>
        <p className="mb-4">
          Personalized mentoring, feedback, and a focus on time management help students improve their performance. With our support, students are well-prepared to excel in the B Tech entrance exams and embark on a successful engineering career.
        </p>
      </div>
    ),
    image: "/Images/b-tech.jpg"
  },
  {
    title: "B Forestry",
    category: CATEGORIES.AGRICULTURE,
    shortDescription: "Preparation for Bachelor of Forestry entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          Our B Forestry entrance exam preparation course in Nepal is designed to help students gain a deep understanding of Forestry Science, Environmental Studies, and Biology. With expert faculty and comprehensive study materials, students are equipped with the knowledge necessary to succeed in the entrance exams and pursue a career in forestry.
        </p>
        <p className="mb-4">
          The course includes in-depth lessons on ecosystem dynamics, forest management, and environmental conservation, ensuring that students are prepared for both theoretical and practical challenges. We also provide regular mock exams and assignments to help students track their progress.
        </p>
        <p className="mb-4">
          Our course is designed to foster a love for environmental conservation and sustainable forest management. With hands-on experience and expert mentorship, students are ready to pursue their studies in forestry and contribute to the preservation of Nepal's natural resources.
        </p>
      </div>
    ),
    image: "/Images/b-forestry.jpg"
  },
  {
    title: "B Veterinary",
    category: CATEGORIES.AGRICULTURE,
    shortDescription: "Coaching for Bachelor of Veterinary Science entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          The B Veterinary entrance exams in Nepal require a strong foundation in Animal Science, Veterinary Medicine, and Biology. Our coaching program helps students master these subjects with comprehensive study materials, hands-on practical sessions, and expert guidance.
        </p>
        <p className="mb-4">
          Students are trained to tackle both theoretical and practical aspects of veterinary science. Our mock exams, case studies, and practice tests ensure that students are well-prepared for the entrance exams. We also emphasize critical thinking and diagnostic skills that are essential for a successful veterinary career.
        </p>
        <p className="mb-4">
          With personalized mentoring, feedback, and practical training, our course ensures that students are ready to succeed in the B Veterinary entrance exams and pursue a fulfilling career in animal healthcare and veterinary science.
        </p>
      </div>
    ),
    image: "/Images/b-veterinary.jpg"
  },
  {
    title: "BSc Agriculture",
    category: CATEGORIES.AGRICULTURE,
    shortDescription: "Expert coaching for BSc Agriculture entrance exams",
    longDescription: (
      <div>
        <p className="mb-4">
          The BSc Agriculture entrance exams in Nepal focus on Agronomy, Plant Science, and Biotechnology. Our expert coaching program is designed to help students gain a thorough understanding of these critical areas. With in-depth study materials, hands-on sessions, and regular mock exams, we ensure that students are well-prepared for the entrance exams.
        </p>
        <p className="mb-4">
          The course also includes case studies, interactive learning, and practical applications to ensure that students develop the necessary problem-solving and critical thinking skills for a career in agriculture. Our faculty provides personalized guidance to help students identify their strengths and areas for improvement.
        </p>
        <p className="mb-4">
          With our expert support and structured learning approach, students are fully prepared to succeed in the BSc Agriculture entrance exams and embark on a successful career in agricultural sciences.
        </p>
      </div>
    ),
    image: "/Images/bsc-agriculture.jpg"
  },
];

const CourseCard = ({ course, onSelect }) => (
  <Card className="overflow-hidden h-full flex flex-col">
    <div className="aspect-video bg-neutral-100 relative">
      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
    </div>
    <CardHeader className="p-4 pb-0">
      <CardTitle className="text-xl">{course.title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-2 flex-grow">
      <p className="text-neutral-600">{course.shortDescription}</p>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button className="w-full" onClick={() => onSelect(course)}>
        Learn More
      </Button>
    </CardFooter>
  </Card>
);

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = activeTab === "all" 
    ? coursesWithCategories 
    : coursesWithCategories.filter(course => course.category === activeTab);

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Courses</h1>
          <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto mb-12">
            Comprehensive courses designed to help you excel in your academic journey
          </p>

          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="mb-2">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value={CATEGORIES.MEDICAL}>{CATEGORIES.MEDICAL}</TabsTrigger>
                <TabsTrigger value={CATEGORIES.ALLIED}>{CATEGORIES.ALLIED}</TabsTrigger>
                <TabsTrigger value={CATEGORIES.AGRICULTURE}>{CATEGORIES.AGRICULTURE}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coursesWithCategories.map((course, index) => (
                  <CourseCard key={index} course={course} onSelect={setSelectedCourse} />
                ))}
              </div>
            </TabsContent>

            {Object.values(CATEGORIES).map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <CourseCard key={index} course={course} onSelect={setSelectedCourse} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Replace custom modal with shadcn Dialog component */}
      <Dialog open={selectedCourse !== null} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCourse.title}</DialogTitle>
                <DialogDescription className="text-sm text-neutral-500">
                  {selectedCourse.category}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="w-full h-56 mb-4 overflow-hidden rounded-md">
                  <img 
                    src={selectedCourse.image} 
                    alt={selectedCourse.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                  />
                </div>
                <div className="text-neutral-600 prose prose-sm max-w-none">
                  {selectedCourse.longDescription}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedCourse(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Courses;
