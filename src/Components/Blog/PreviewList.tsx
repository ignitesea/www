import { ReactElement } from 'react';
import { DateTime } from 'luxon';
import { ChakraProps } from '@chakra-ui/system';
import { Box, Text, Link } from '@chakra-ui/react';
import { Post } from '../../utils/wordpress';

interface PreviewListProps extends ChakraProps {
  posts: Post[]
}

export default function PreviewList({ posts, ...props }: PreviewListProps): ReactElement {
  return (
    <Box {...props}>
      {posts.map((post) => {
        const date = DateTime.fromISO(post.date);
        const slug = `${date.toFormat('yyyy/MM/dd')}/${post.slug}/`;

        return (
          <Box key={post.slug} mb={6}>
            <Link href={slug} _hover={{ textDecoration: 'none' }}>
              <Box mb={2}>
                <Text
                  as="h3"
                  fontWeight="bold"
                  color="red.800"
                  d="inline"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <Text as="span" d="inline">
                  &thinsp;&mdash;&thinsp;
                  {date.toLocaleString(DateTime.DATE_MED)}
                </Text>
              </Box>
              <Box dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </Link>
          </Box>
        );
      })}
    </Box>
  )
}
