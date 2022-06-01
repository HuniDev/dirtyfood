import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Box,
	Paragraph,
	Heading,
} from 'grommet';

const Posts = ({ posts, loading }) => {
	if (loading) {
		return <Heading margin='large'>Loading...</Heading>;
	}

	return (
		<Box direction='row-responsive' wrap={true} justify='center' margin='small'>
			{posts.map(post => (
				<Card
					margin='small'
					key={post.recall_number}
					width='300px'
					height='380px'
				>
					<CardHeader pad='small' background='light-2'>
						{post.recalling_firm}
					</CardHeader>
					<CardBody overflow='scroll' pad='medium'>
						<Text weight='bold'> Distribution </Text>
						<Paragraph>{post.distribution_pattern}</Paragraph>

						<Text weight='bold'>Description</Text>
						<Paragraph>{post.product_description}</Paragraph>

						<Text weight='bold'>Recall Reason</Text>
						<Paragraph>{post.reason_for_recall}</Paragraph>
					</CardBody>
					<CardFooter pad={{ horizontal: 'small' }}></CardFooter>
				</Card>
			))}
		</Box>
	);
};

export default Posts;
