"use client";

import { useState } from "react";
import { Lesson, Course, UserProgress, GlossaryTerm } from "@prisma/client";
import { completeLesson, submitQuiz } from "@/app/actions/lesson";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

interface LessonWithQuiz extends Lesson {
  quiz: {
    id: string;
    title: string;
    passingScore: number;
    questions: {
      id: string;
      question: string;
      order: number;
      points: number;
      options: {
        id: string;
        text: string;
        isCorrect: boolean;
        order: number;
      }[];
    }[];
  } | null;
}

interface LessonClientProps {
  lesson: LessonWithQuiz;
  course: Course;
  isLocked: boolean;
  currentProgress: UserProgress | null;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  courseSlug: string;
  userId: string;
  glossaryTerms: { term: string; definition: string; example: string | null }[];
}

export default function LessonClient({
  lesson,
  course,
  isLocked,
  currentProgress,
  prevLesson,
  nextLesson,
  courseSlug,
  userId,
  glossaryTerms,
}: LessonClientProps) {
  const { t } = useLanguage();
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    passed: boolean;
    error?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompleteLesson = async () => {
    setIsLoading(true);
    await completeLesson({ lessonId: lesson.id, userId });
    setIsLoading(false);
  };

  const handleQuizSubmit = async () => {
    if (!lesson.quiz) return;

    setIsLoading(true);
    const result = await submitQuiz({
      quizId: lesson.quiz.id,
      userId,
      answers: quizAnswers,
    });

    setQuizResult(result);
    setQuizSubmitted(true);
    setIsLoading(false);
  };

  if (isLocked) {
    return (
      <div className="p-8 lg:p-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.lesson.lessonLocked}
          </h2>
          <p className="text-gray-600 mb-6">{t.lesson.unlockMessage}</p>
          {prevLesson && (
            <Link
              href={`/learn/${courseSlug}/${prevLesson.slug}`}
              className="inline-flex bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-all"
            >
              {t.lesson.goToPrevious}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Link href={`/dashboard`} className="hover:text-blue-600">
            {t.lesson.dashboard}
          </Link>
          <span>/</span>
          <Link href={`/dashboard`} className="hover:text-blue-600">
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{lesson.title}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
        {lesson.duration && (
          <p className="text-gray-600 mt-2">
            ⏱️ {lesson.duration} {t.lesson.minRead}
          </p>
        )}
      </div>

      {/* Lesson Content */}
      <div className="prose prose-lg max-w-none bg-white rounded-2xl p-6 lg:p-8 shadow-sm mb-8">
        <LessonContent content={lesson.content} glossaryTerms={glossaryTerms} />
      </div>

      {/* Complete Button */}
      {!currentProgress?.isCompleted && !lesson.quiz && (
        <div className="mb-8">
          <button
            onClick={handleCompleteLesson}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50"
          >
            {isLoading ? t.lesson.saving : t.lesson.markComplete}
          </button>
        </div>
      )}

      {currentProgress?.isCompleted && !lesson.quiz && (
        <div className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-green-800 font-medium">
              {t.lesson.lessonCompleted}
            </p>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {lesson.quiz && (
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.lesson.quizTitle} {lesson.quiz.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.lesson.passingScore}: {lesson.quiz.passingScore}%
          </p>

          {!quizSubmitted ? (
            <div className="space-y-6">
              {lesson.quiz.questions.map((question) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <p className="font-semibold text-gray-900 mb-4">
                    {question.order}. {question.question}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.id}
                          checked={quizAnswers[question.id] === option.id}
                          onChange={(e) =>
                            setQuizAnswers({
                              ...quizAnswers,
                              [question.id]: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleQuizSubmit}
                disabled={
                  isLoading ||
                  Object.keys(quizAnswers).length < lesson.quiz.questions.length
                }
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t.lesson.submitting : t.lesson.submitQuiz}
              </button>
            </div>
          ) : quizResult ? (
            <div className="text-center">
              <div
                className={`text-6xl mb-4 ${quizResult.passed ? "🎉" : "📚"}`}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {quizResult.passed
                  ? t.lesson.congratulations
                  : t.lesson.keepLearning}
              </h3>
              <p className="text-gray-600 mb-6">
                {t.lesson.yourScore}:{" "}
                <span className="font-bold">{quizResult.score}%</span>
              </p>

              {quizResult.passed ? (
                <div className="space-y-4">
                  <button
                    onClick={handleCompleteLesson}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {isLoading ? t.lesson.saving : t.lesson.markComplete}
                  </button>
                  {nextLesson && (
                    <Link
                      href={`/learn/${courseSlug}/${nextLesson.slug}`}
                      className="block w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition-all"
                    >
                      {t.lesson.continueNext}
                    </Link>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                    setQuizResult(null);
                  }}
                  className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all"
                >
                  {t.lesson.tryAgain}
                </button>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        {prevLesson ? (
          <Link
            href={`/learn/${courseSlug}/${prevLesson.slug}`}
            className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-center hover:bg-gray-50 transition-all"
          >
            {t.lesson.previous}
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextLesson && (
          <Link
            href={`/learn/${courseSlug}/${nextLesson.slug}`}
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-center hover:bg-blue-700 transition-all"
          >
            {t.lesson.next}
          </Link>
        )}
      </div>
    </div>
  );
}

function LessonContent({
  content,
  glossaryTerms,
}: {
  content: string;
  glossaryTerms: { term: string; definition: string; example: string | null }[];
}) {
  const { t } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState<{
    term: string;
    definition: string;
    example: string | null;
  } | null>(null);

  const lines = content.split("\n");

  const handleClickTerm = (e: React.MouseEvent, termText: string) => {
    const term = glossaryTerms.find(
      (t) => t.term.toLowerCase() === termText.toLowerCase(),
    );
    if (term) {
      e.preventDefault();
      e.stopPropagation();
      setSelectedTerm({
        term: term.term,
        definition: term.definition,
        example: term.example,
      });
    }
  };

  const renderLine = (line: string, index: number) => {
    let processedLine: React.ReactNode = line;

    // Highlight glossary terms
    glossaryTerms.forEach((glossaryTerm) => {
      const regex = new RegExp(`\\b(${glossaryTerm.term})\\b`, "gi");
      const parts = (processedLine as string).toString().split(regex);
      processedLine = parts.map((part, i) => {
        if (part.toLowerCase() === glossaryTerm.term.toLowerCase()) {
          return (
            <span
              key={i}
              onClick={(e) => handleClickTerm(e, part)}
              className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              {part}
            </span>
          );
        }
        return part;
      });
    });

    return processedLine;
  };

  return (
    <div className="space-y-4 relative">
      {lines.map((line, index) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-bold text-gray-900">
              {renderLine(line.replace("# ", ""), index)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900">
              {renderLine(line.replace("## ", ""), index)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-bold text-gray-900">
              {renderLine(line.replace("### ", ""), index)}
            </h3>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-blue-500 pl-4 italic text-gray-700 bg-blue-50 py-2 pr-2 rounded-r"
            >
              {renderLine(line.replace("> ", ""), index)}
            </blockquote>
          );
        }
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={index} className="ml-4 text-gray-700">
              {renderLine(line.replace(/[-*] /, ""), index)}
            </li>
          );
        }
        if (line.match(/^\d+\. /)) {
          return (
            <li key={index} className="ml-4 text-gray-700 list-decimal">
              {renderLine(line.replace(/^\d+\. /, ""), index)}
            </li>
          );
        }
        if (line.trim() === "") {
          return <br key={index} />;
        }
        return (
          <p key={index} className="text-gray-700 leading-relaxed">
            {renderLine(line, index)}
          </p>
        );
      })}

      {/* Glossary Popup */}
      {selectedTerm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedTerm(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedTerm.term}
              </h3>
              <button
                onClick={() => setSelectedTerm(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 mb-4">{selectedTerm.definition}</p>
            {selectedTerm.example && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{t.lesson.example}:</span>{" "}
                  {selectedTerm.example}
                </p>
              </div>
            )}
            <button
              onClick={() => setSelectedTerm(null)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              {t.lesson.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
