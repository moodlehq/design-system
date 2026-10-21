import figma from '@figma/code-connect';
import { CourseCard } from './CourseCard';

// NOTE: node 4:2968 is a plain frame ("Course Card1"), not a published
// component, so this mapping cannot be published until the design team
// promotes it to a component in the Moodle Design System file. The text
// mappings below follow the layer names in the frame.
const url =
  'https://www.figma.com/design/qkuYnit8WCGBGHHNfSvPmo/Course-card?node-id=4-2968';

const baseProps = {
  title: figma.string('Title'),
  subtitle: figma.string('Subtitle'),
};

figma.connect(CourseCard, url, {
  props: { ...baseProps },
  example: ({ title, subtitle }) => (
    <CourseCard
      title={title}
      subtitle={subtitle}
      imageSrc="/course.jpg"
      progressLabel="Lesson 7 of 16"
      progressValue={7}
      progressMax={16}
      linkLabel="Continue learning"
      linkHref="#"
    />
  ),
});
