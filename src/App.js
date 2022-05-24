import './App.css';
import { Grommet, Heading, Header, Menu, Box } from 'grommet';
import { useState, useEffect } from 'react';
import Posts from './components/Posts';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

function App() {
	const theme = {
		global: {
			font: {
				family: 'Josefin Sans',
				size: '18px',
				height: '20px',
			},
		},
	};

	const handlePageClick = ({ selected: selectedPage }) => {
		setCurrentPage(selectedPage);
	};

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const res = await axios.get(
				'https://api.fda.gov/food/enforcement.json?search=classification.exact:"Class+I"+AND+status:"ongoing"&sort=report_date:desc&limit=500'
			);
			setData(res.data.results);
			setLoading(false);
		};
		fetchPosts();
	}, []);

	const PER_PAGE = 12;
	const offset = currentPage * PER_PAGE;
	const currentPosts = data.slice(offset, offset + PER_PAGE);
	const pageCount = Math.ceil(data.length / PER_PAGE);

	return (
		<Grommet theme={theme}>
			<Header
				fill='horizontal'
				justify='center'
				background='#717BD9'
				height='xsmall'
			>
				<Heading margin={{ left: '100px' }} size='medium' color='white'>
					Dirty Food
				</Heading>
				<Menu
					margin={{ left: 'auto', right: '35px' }}
					color='black'
					label='Filter'
					items={[
						{
							label: 'AL ',
						},
						{ label: 'AK' },
						{ label: 'AZ' },
						{ label: 'AR' },
						{ label: 'CA' },
						{ label: 'CO' },
						{ label: 'CT' },
						{ label: 'DE' },
						{ label: 'DC' },
						{ label: 'FL' },
						{ label: 'GA' },
						{ label: 'HI' },
						{ label: 'ID' },
						{ label: 'IL' },
						{ label: 'IN' },
						{ label: 'IA' },
						{ label: 'KS' },
						{ label: 'KY' },
						{ label: 'LA' },
						{ label: 'ME' },
						{ label: 'MD' },
						{ label: 'MA' },
						{ label: 'MI' },
						{ label: 'MN' },
						{ label: 'MS' },
						{ label: 'MO' },
						{ label: 'MT' },
						{ label: 'NE' },
						{ label: 'NV' },
						{ label: 'NH' },
						{ label: 'NJ' },
						{ label: 'NM' },
						{ label: 'NY' },
						{ label: 'NC' },
						{ label: 'ND' },
						{ label: 'OH' },
						{ label: 'OK' },
						{ label: 'OR' },
						{ label: 'PA' },
						{ label: 'PR' },
						{ label: 'RI' },
						{ label: 'SC' },
						{ label: 'SD' },
						{ label: 'TN' },
						{ label: 'TX' },
						{ label: 'UT' },
						{ label: 'VT' },
						{ label: 'VA' },
						{ label: 'WA' },
						{ label: 'WV' },
						{ label: 'WI' },
						{ label: 'WY' },
					]}
				/>
			</Header>

			<Box fill='horizontal' align='center'>
				<Posts posts={currentPosts} loading={loading} />
			</Box>

			<Box align='center' pad='medium'>
				<ReactPaginate
					previousLabel={'← Previous'}
					nextLabel={'Next →'}
					onPageChange={handlePageClick}
					pageCount={pageCount}
					pageRangeDisplayed={5}
					containerClassName={'pagination'}
					previousLinkClassName={'pagination_link'}
					nextLinkClassName={'pagination_link'}
					disabledLinkClassName={'pagination_link--disabled'}
					activeLinkClassName={'pagination_link--active'}
					renderOnZeroPageCount={null}
				/>
			</Box>
		</Grommet>
	);
}

export default App;
