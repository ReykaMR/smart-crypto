"use client";

import { useState } from "react";
import { Certificate, Course } from "@prisma/client";
import { generateCertificate } from "@/app/actions/certificate";
import { useLanguage } from "@/lib/i18n";

interface CertificatesClientProps {
  certificates: (Certificate & { course: Course })[];
  courses: Course[];
  completedCourses: Course[];
  userId: string;
}

export default function CertificatesClient({
  certificates,
  courses,
  completedCourses,
  userId,
}: CertificatesClientProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCertificate = async (courseId: string) => {
    setIsLoading(courseId);
    setError(null);
    const result = await generateCertificate({ userId, courseId });

    if (result.success && result.certificate) {
      // Download PDF
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${result.certificate.pdf}`;
      link.download = `certificate-${result.certificate.certificateId}.pdf`;
      link.click();
      window.location.reload();
    } else {
      setError(result.error || t.certificates.failedToGenerate);
    }
    setIsLoading(null);
  };

  return (
    <div className="space-y-8">
      {/* Earned Certificates */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.certificates.earned}
        </h2>

        {certificates.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <p className="text-gray-600 mb-4">
              {t.certificates.noCertificates}
            </p>
            <p className="text-sm text-gray-500">
              {t.certificates.completeLessons}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-linear-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">🏆</div>
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t.certificates.certificateId}: {cert.certificateId}
                </p>
                <button
                  onClick={() => handleGenerateCertificate(cert.courseId)}
                  className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-all"
                >
                  {t.certificates.downloadPDF}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Available Courses for Certificate */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.certificates.available}
          </h2>
          <div className="space-y-4">
            {completedCourses.map((course) => {
              const hasCertificate = certificates.some(
                (c) => c.courseId === course.id,
              );

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600">{course.description}</p>
                    </div>
                    {hasCertificate ? (
                      <span className="text-green-600 font-semibold">
                        {t.certificates.obtained}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleGenerateCertificate(course.id)}
                        disabled={isLoading === course.id}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
                      >
                        {isLoading === course.id
                          ? t.certificates.generating
                          : t.certificates.generate}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
