import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Avatar } from '../avatar';
import { Badge } from '../badge';
import { Link } from '../link';
import { ProgressBar } from '../progress-bar';

type CourseCardHeadingLevel = 2 | 3 | 4 | 5 | 6;

const allowedHeadingLevels: CourseCardHeadingLevel[] = [2, 3, 4, 5, 6];

export interface CourseCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> {
  /** Course name. Must be a caller-supplied translated string. */
  title: string;
  /** Heading level for the title (2–6). Defaults to 3. */
  headingLevel?: CourseCardHeadingLevel;
  /** Secondary text beneath the title, e.g. the course category. */
  subtitle?: string;
  /** Course image URL. The image block is omitted when not provided. */
  imageSrc?: string;
  /** Alt text for the course image. Leave empty when the image is decorative. */
  imageAlt?: string;
  /** Optional badge text shown beneath the title block. */
  badgeLabel?: string;
  /** Optional teacher name. Renders the teacher row when provided. */
  teacherName?: string;
  /** Teacher photo URL for the avatar. */
  teacherImageSrc?: string;
  /** Pre-translated progress text, e.g. "Lesson 7 of 16". Renders the progress bar when provided. */
  progressLabel?: string;
  /** Current progress value. Defaults to 0. */
  progressValue?: number;
  /** Maximum progress value. Defaults to 100. */
  progressMax?: number;
  /** Footer link text, e.g. "Continue learning". Renders the link when provided with `linkHref`. */
  linkLabel?: string;
  /** Footer link destination. */
  linkHref?: string;
}

export const CourseCard = forwardRef<HTMLElement, CourseCardProps>(
  function CourseCard(
    {
      title,
      headingLevel = 3,
      subtitle,
      imageSrc,
      imageAlt = '',
      badgeLabel,
      teacherName,
      teacherImageSrc,
      progressLabel,
      progressValue = 0,
      progressMax = 100,
      linkLabel,
      linkHref,
      className,
      ...props
    },
    ref,
  ) {
    const isAllowedLevel = allowedHeadingLevels.includes(headingLevel);
    const resolvedLevel: CourseCardHeadingLevel = isAllowedLevel
      ? headingLevel
      : 3;
    const Heading = `h${resolvedLevel}` as const;

    if (import.meta.env.DEV && !isAllowedLevel) {
      console.warn(
        `[MDS CourseCard] Invalid headingLevel "${headingLevel}". Falling back to 3. Allowed: ${allowedHeadingLevels.join(', ')}`,
      );
    }

    const classes = ['mds-course-card'];
    if (className) classes.push(className);

    return (
      <article ref={ref} className={classes.join(' ')} {...props}>
        {imageSrc && (
          <div className="mds-course-card-image">
            <img
              className="mds-course-card-image-img"
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
            />
          </div>
        )}
        <div className="mds-course-card-content">
          <div className="mds-course-card-header">
            <div className="mds-course-card-text">
              <Heading className="mds-course-card-title">{title}</Heading>
              {subtitle && (
                <p className="mds-course-card-subtitle">{subtitle}</p>
              )}
            </div>
            {badgeLabel && (
              <Badge label={badgeLabel} variant="secondary" subtle />
            )}
          </div>
          {teacherName && (
            <div className="mds-course-card-teacher">
              <Avatar size="sm" imageSrc={teacherImageSrc} alt={teacherName} />
              <span className="mds-course-card-teacher-name">
                {teacherName}
              </span>
            </div>
          )}
          {progressLabel && (
            <ProgressBar
              labelVariant="title"
              title={progressLabel}
              value={progressValue}
              max={progressMax}
            />
          )}
          {linkLabel && linkHref && (
            <Link
              label={linkLabel}
              href={linkHref}
              variant="primary"
              endIcon={<i className="fa-solid fa-arrow-right" />}
            />
          )}
        </div>
      </article>
    );
  },
);

CourseCard.displayName = 'CourseCard';
