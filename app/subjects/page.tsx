import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

const subjectsData = {
  '9': [
    { name: 'Mathematics', description: 'Algebra, Geometry, Number Systems, and Statistics' },
    { name: 'Science', description: 'Physics, Chemistry, and Biology fundamentals' },
    { name: 'English', description: 'Literature, Grammar, and Composition' },
    { name: 'Hindi', description: 'Literature and Language Skills' },
    { name: 'Social Science', description: 'History, Geography, Political Science, and Economics' },
    { name: 'Computer Science', description: 'Basic Programming and Digital Literacy' },
  ],
  '10': [
    { name: 'Mathematics', description: 'Advanced Algebra, Trigonometry, and Coordinate Geometry' },
    { name: 'Science', description: 'Physics, Chemistry, and Biology with practical applications' },
    { name: 'English', description: 'Literature, Writing Skills, and Communication' },
    { name: 'Hindi', description: 'Literature and Advanced Language Studies' },
    { name: 'Social Science', description: 'Contemporary India, World History, and Economics' },
    { name: 'Computer Science', description: 'Programming, Data Management, and Networking' },
  ],
  '11-Science': [
    { name: 'Physics', description: 'Mechanics, Thermodynamics, and Electromagnetism' },
    { name: 'Chemistry', description: 'Physical, Organic, and Inorganic Chemistry' },
    { name: 'Mathematics', description: 'Calculus, Algebra, and Analytical Geometry' },
    { name: 'Biology', description: 'Plant and Animal Physiology, Ecology' },
    { name: 'English', description: 'Communication and Writing Skills' },
    { name: 'Computer Science', description: 'C++ Programming and Data Structures' },
  ],
  '11-Arts': [
    { name: 'History', description: 'Ancient and Medieval World History' },
    { name: 'Political Science', description: 'Indian Constitution and Political Theory' },
    { name: 'Geography', description: 'Physical and Human Geography' },
    { name: 'Economics', description: 'Microeconomics and Indian Economic Development' },
    { name: 'English', description: 'Literature and Communication' },
    { name: 'Hindi', description: 'Literature and Language Studies' },
  ],
  '12-Science': [
    { name: 'Physics', description: 'Modern Physics, Optics, and Electromagnetic Induction' },
    { name: 'Chemistry', description: 'Advanced Organic, Inorganic, and Physical Chemistry' },
    { name: 'Mathematics', description: 'Differential Equations, Vectors, and Probability' },
    { name: 'Biology', description: 'Genetics, Evolution, and Biotechnology' },
    { name: 'English', description: 'Advanced Communication and Literature' },
    { name: 'Computer Science', description: 'Advanced Programming and Database Management' },
  ],
  '12-Arts': [
    { name: 'History', description: 'Modern Indian and World History' },
    { name: 'Political Science', description: 'Contemporary World Politics and Indian Government' },
    { name: 'Geography', description: 'Human Geography and Regional Planning' },
    { name: 'Economics', description: 'Macroeconomics and Indian Economy' },
    { name: 'English', description: 'Literature and Advanced Communication' },
    { name: 'Hindi', description: 'Advanced Literature and Language' },
  ],
};

function SubjectsList({ subjects }: { subjects: Array<{ name: string; description: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {subjects.map((subject, index) => (
        <Card key={index}>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: '#0B5FFF', fontFamily: 'Inter, sans-serif' }}
          >
            {subject.name}
          </h3>
          <p className="text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {subject.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default function SubjectsPage() {
  const tabs = [
    { id: '9', label: 'Class 9', content: <SubjectsList subjects={subjectsData['9']} /> },
    { id: '10', label: 'Class 10', content: <SubjectsList subjects={subjectsData['10']} /> },
    {
      id: '11-science',
      label: 'Class 11 (Science)',
      content: <SubjectsList subjects={subjectsData['11-Science']} />,
    },
    {
      id: '11-arts',
      label: 'Class 11 (Arts)',
      content: <SubjectsList subjects={subjectsData['11-Arts']} />,
    },
    {
      id: '12-science',
      label: 'Class 12 (Science)',
      content: <SubjectsList subjects={subjectsData['12-Science']} />,
    },
    {
      id: '12-arts',
      label: 'Class 12 (Arts)',
      content: <SubjectsList subjects={subjectsData['12-Arts']} />,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
            >
              Subjects by Class
            </h1>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Explore the comprehensive curriculum offered for each class and stream.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

