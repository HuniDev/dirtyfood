import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Box,
	Paragraph,
} from 'grommet';

const Posts = ({ posts, loading }) => {
	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<Box direction='row-responsive' wrap='true' justify='center'>
			{posts.map(post => (
				<Card margin='small' key={post.recall_number} width='medium'>
					<CardHeader pad='small' background='light-2'>
						{post.recalling_firm}
					</CardHeader>
					<CardBody pad='medium'>
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
