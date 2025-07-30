import { CourseInterface } from "@/lib/db/models/courseModel";
import { CourseClientData } from "@/types/course";

/**
 * Serialize a Mongoose course document to a client-safe object
 */
export function serializeCourse(course: CourseInterface | null): CourseClientData | null {
  if (!course) return null;

  return {
    _id: course._id?.toString() || "",
    title: course.title || "",
    subtitle: course.subtitle || "",
    thumbnail: course.thumbnail || "",
    description: course.description || "",
    authors: course.authors?.map(id => id.toString()) || [],
    lectures: course.lectures?.map(id => id.toString()) || [],
    price: course.price || 0,
    offer: course.offer || 0,
    offerEndsAt: course.offerEndsAt?.toISOString() || new Date().toISOString(),
    language: course.language || "English",
    subtitleLanguage: course.subtitleLanguage || "English",
    studentsCount: course.studentsCount || 0,
    duration: course.duration || 0,
    category: course.category?.toString() || null,
    tags: course.tags?.map(id => id.toString()) || [],
    video: course.video?.map(id => id.toString()) || [],
    subCategory: course.subCategory?.toString() || null,
    topic: course.topic || "",
    level: course.level || "Beginner",
    durationUnit: course.durationUnit || "Hour",
    trailer: course.trailer || "",
    learningOutcomes: course.learningOutcomes || [],
    targetAudience: course.targetAudience || [],
    requirements: course.requirements || [],
    createdAt: (course as any).createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: (course as any).updatedAt?.toISOString() || new Date().toISOString(),
  };
}

/**
 * Serialize an array of Mongoose course documents
 */
export function serializeCourses(courses: CourseInterface[]): CourseClientData[] {
  return courses.map(course => serializeCourse(course)!).filter(Boolean);
}

/**
 * Generic function to serialize any Mongoose document
 */
export function serializeDocument<T extends { _id: any; [key: string]: any }>(
  doc: T | null
): (Omit<T, '_id'> & { _id: string }) | null {
  if (!doc) return null;

  const serialized = { ...doc.toObject() };
  serialized._id = doc._id.toString();

  // Convert all ObjectIds to strings
  Object.keys(serialized).forEach(key => {
    const value = serialized[key];
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        serialized[key] = value.map(item => 
          item && typeof item === 'object' && item._bsontype === 'ObjectID' 
            ? item.toString() 
            : item
        );
      } else if (value._bsontype === 'ObjectID') {
        serialized[key] = value.toString();
      }
    }
  });

  return serialized;
} 