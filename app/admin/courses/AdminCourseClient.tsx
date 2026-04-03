"use client";

import { useState } from "react";
import { Course, CourseModule, Lesson } from "@prisma/client";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  createModule,
  createLesson,
  deleteLesson,
} from "@/app/actions/admin";
import { useLanguage } from "@/lib/i18n";

interface AdminCourseClientProps {
  courses: (Course & {
    modules: (CourseModule & { lessons: Lesson[] })[];
    _count: { progress: number; certificates: number };
  })[];
}

export default function AdminCourseClient({ courses }: AdminCourseClientProps) {
  const { t } = useLanguage();
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t.admin.courseManagement}
          </h1>
          <p className="text-gray-600 mt-1">{t.admin.manageCourses}</p>
        </div>
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowCourseModal(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg"
        >
          {t.admin.addCourse}
        </button>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  {course.isPublished ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      {t.admin.published}
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {t.admin.draft}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    {course.modules.length} {t.admin.modules}
                  </span>
                  <span>
                    {course._count.progress} {t.admin.students}
                  </span>
                  <span>
                    {course._count.certificates} {t.admin.certificates}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setShowCourseModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  {t.admin.edit}
                </button>
                <button
                  onClick={() => {
                    if (confirm(t.admin.deleteCourseConfirm)) {
                      deleteCourse(course.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50"
                >
                  {t.admin.delete}
                </button>
              </div>
            </div>

            {/* Modules */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-700">
                  {t.admin.modules}
                </h4>
                <button
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setShowModuleModal(true);
                  }}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200"
                >
                  {t.admin.addModule}
                </button>
              </div>

              <div className="space-y-3">
                {course.modules.map((module) => (
                  <div key={module.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded">
                          {t.admin.module} {module.order}
                        </span>
                        <h5 className="font-medium text-gray-900">
                          {module.title}
                        </h5>
                        {module.isLocked && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            {t.admin.locked}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="ml-4 space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {t.admin.lesson} {lesson.order}
                            </span>
                            <span className="text-sm text-gray-700 font-medium">
                              {lesson.title}
                            </span>
                            {lesson.isFree && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                {t.admin.free}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(t.admin.deleteLessonConfirm)) {
                                deleteLesson(lesson.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50"
                          >
                            {t.admin.delete}
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedModuleId(module.id);
                        setShowLessonModal(true);
                      }}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t.admin.addLesson}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingCourse ? t.admin.editCourse : t.admin.addCourse}
            </h3>
            <form
              action={
                editingCourse
                  ? (formData) =>
                      updateCourse(editingCourse.id, formData).then(() =>
                        setShowCourseModal(false),
                      )
                  : (formData) =>
                      createCourse(formData).then(() =>
                        setShowCourseModal(false),
                      )
              }
              className="space-y-4"
            >
              {editingCourse && (
                <input type="hidden" name="id" value={editingCourse.id} />
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.title}
                </label>
                <input
                  name="title"
                  defaultValue={editingCourse?.title}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.slug}
                </label>
                <input
                  name="slug"
                  defaultValue={editingCourse?.slug}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.description}
                </label>
                <textarea
                  name="description"
                  defaultValue={editingCourse?.description}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={editingCourse?.isPublished}
                  id="isPublished"
                  className="w-4 h-4"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">
                  {t.admin.published}
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {t.common.save}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  {t.common.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Module Modal */}
      {showModuleModal && selectedCourseId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{t.admin.addModule}</h3>
            <form
              action={(formData) => {
                createModule(formData).then(() => setShowModuleModal(false));
              }}
              className="space-y-4"
            >
              <input type="hidden" name="courseId" value={selectedCourseId} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.title}
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.description}
                </label>
                <textarea
                  name="description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.order}
                </label>
                <input
                  name="order"
                  type="number"
                  defaultValue="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isLocked"
                  id="isLocked"
                  className="w-4 h-4"
                />
                <label htmlFor="isLocked" className="text-sm text-gray-700">
                  {t.admin.locked}
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {t.common.save}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModuleModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  {t.common.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {showLessonModal && selectedModuleId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{t.admin.addLesson}</h3>
            <form
              action={(formData) => {
                createLesson(formData).then(() => setShowLessonModal(false));
              }}
              className="space-y-4"
            >
              <input type="hidden" name="moduleId" value={selectedModuleId} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.title}
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.slug}
                </label>
                <input
                  name="slug"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.contentMarkdown}
                </label>
                <textarea
                  name="content"
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.admin.order}
                  </label>
                  <input
                    name="order"
                    type="number"
                    defaultValue="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.admin.duration}
                  </label>
                  <input
                    name="duration"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isFree"
                  id="isFree"
                  className="w-4 h-4"
                />
                <label htmlFor="isFree" className="text-sm text-gray-700">
                  {t.admin.freePreview}
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {t.common.save}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLessonModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  {t.common.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
