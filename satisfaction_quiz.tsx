import React, { useState } from 'react';
import { Award, Heart, TrendingUp, Users, Coffee, Gift } from 'lucide-react';

export default function SatisfactionQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'checkbox',
      question: 'Что положительно повлияет на вашу эмоциональную составляющую во время работы?',
      icon: Heart,
      options: [
        'Ароматизация и увлажнение воздуха',
        'Наличие сладостей, сиропов',
        'Обстановка офиса (ремонт, цветы, мебель)',
        'Развлечения (игры, антистресс, массажер)',
        'Экскурсии',
        'Выездные мероприятия',
        'Аудио наполнение',
        'Дополнительный перерыв на отдых'
      ]
    },
    {
      id: 2,
      type: 'text',
      question: 'Чем бы вы дополнили кухонную зону?',
      icon: Coffee,
      placeholder: 'Опишите свои пожелания...'
    },
    {
      id: 3,
      type: 'checkbox',
      question: 'Что повысит вашу работоспособность?',
      icon: TrendingUp,
      options: [
        'Систематизация хранения (шкафы, полки)',
        'Удобный стул',
        'Температура воздуха',
        'Освещение',
        'Чистота и порядок',
        'Скорость работы компьютера и интернета',
        'Рабочее оборудование'
      ]
    },
    {
      id: 4,
      type: 'slider',
      question: 'Оцените утверждения (0-100%)',
      icon: Users,
      statements: [
        'Я знаю цели компании',
        'Информация о компании доступна',
        'Я четко понимаю свои обязанности',
        'Передо мной ставятся конкретные задачи',
        'Я часть команды, с моим мнением считаются'
      ]
    },
    {
      id: 5,
      type: 'rating',
      question: 'Насколько важно для вас? (1-10)',
      icon: Award,
      items: [
        'Знать перспективы развития компании',
        'Получать информацию о происходящем',
        'Открыто обсуждать проблемы с руководителем',
        'Вносить предложения о нововведениях'
      ]
    },
    {
      id: 6,
      type: 'text',
      question: 'На чем основываются успехи компании?',
      icon: Gift,
      placeholder: 'Поделитесь своим мнением...'
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    Object.entries(answers).forEach(([qId, answer]) => {
      const q = questions.find(qu => qu.id === parseInt(qId));
      
      if (q.type === 'checkbox') {
        totalScore += Array.isArray(answer) ? answer.length * 10 : 0;
        maxScore += q.options.length * 10;
      } else if (q.type === 'slider') {
        const avg = answer ? Object.values(answer).reduce((a, b) => a + b, 0) / Object.values(answer).length : 0;
        totalScore += avg;
        maxScore += 100;
      } else if (q.type === 'rating') {
        const avg = answer ? Object.values(answer).reduce((a, b) => a + b, 0) / Object.values(answer).length : 0;
        totalScore += avg * 10;
        maxScore += 100;
      } else if (q.type === 'text' && answer && answer.trim()) {
        totalScore += 50;
        maxScore += 50;
      }
    });

    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  const getResultMessage = (score) => {
    if (score >= 80) return {
      title: 'Высокий уровень удовлетворенности! 🌟',
      message: 'Вы высоко оцениваете работу в компании. Ваше мнение очень ценно для нас!',
      color: 'from-green-500 to-emerald-600'
    };
    if (score >= 60) return {
      title: 'Средний уровень удовлетворенности',
      message: 'Есть аспекты, которые можно улучшить. Мы работаем над этим!',
      color: 'from-blue-500 to-cyan-600'
    };
    return {
      title: 'Есть что улучшать',
      message: 'Ваши ответы помогут нам стать лучше. Спасибо за честность!',
      color: 'from-orange-500 to-amber-600'
    };
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  if (showResults) {
    const score = calculateScore();
    const result = getResultMessage(score);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
          <div className="text-center">
            <div className={`inline-block p-6 rounded-full bg-gradient-to-r ${result.color} mb-6`}>
              <Award className="w-16 h-16 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {result.title}
            </h2>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-gray-800 mb-2">{score}%</div>
              <p className="text-gray-600 text-lg">{result.message}</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-2xl p-6 mb-6">
              <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">🎁 Ваш бонус!</h3>
              <p className="text-gray-700 mb-3">
                Один час дополнительного отдыха в январе
              </p>
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-yellow-400">
                <p className="text-sm text-gray-600 mb-2">Кодовое слово:</p>
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
                  ЗАСЛУЖИЛ
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Назовите это слово руководителю для активации бонуса
              </p>
            </div>

            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
                setShowResults(false);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Пройти заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];
  const Icon = currentQuestion.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Icon className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Оценка удовлетворенности</h1>
              </div>
              <div className="text-sm bg-white/20 px-4 py-2 rounded-full">
                {step + 1} / {questions.length}
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'checkbox' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <label key={idx} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-purple-50 cursor-pointer transition-all border-2 border-transparent hover:border-purple-300">
                    <input
                      type="checkbox"
                      checked={answers[currentQuestion.id]?.includes(option) || false}
                      onChange={(e) => {
                        const current = answers[currentQuestion.id] || [];
                        const updated = e.target.checked
                          ? [...current, option]
                          : current.filter(o => o !== option);
                        handleAnswer(currentQuestion.id, updated);
                      }}
                      className="w-5 h-5 text-purple-600 rounded"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all min-h-32"
              />
            )}

            {currentQuestion.type === 'slider' && (
              <div className="space-y-6">
                {currentQuestion.statements.map((statement, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {statement}
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">0%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={answers[currentQuestion.id]?.[idx] || 50}
                        onChange={(e) => {
                          const current = answers[currentQuestion.id] || {};
                          handleAnswer(currentQuestion.id, { ...current, [idx]: parseInt(e.target.value) });
                        }}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <span className="text-sm font-bold text-purple-600 w-12">
                        {answers[currentQuestion.id]?.[idx] || 50}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.type === 'rating' && (
              <div className="space-y-6">
                {currentQuestion.items.map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {item}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button
                          key={num}
                          onClick={() => {
                            const current = answers[currentQuestion.id] || {};
                            handleAnswer(currentQuestion.id, { ...current, [idx]: num });
                          }}
                          className={`w-12 h-12 rounded-lg font-bold transition-all ${
                            answers[currentQuestion.id]?.[idx] === num
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110 shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="p-6 bg-gray-50 flex justify-between">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className="px-6 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              Назад
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
            >
              {step === questions.length - 1 ? 'Получить результат' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
