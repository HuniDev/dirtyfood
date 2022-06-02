import './App.css';
import { Grommet, Heading, Header, Select, Box } from 'grommet';
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
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredData, setFilteredData] = useState([]);
	const [value, setValue] = useState();

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const res = await axios.get(
				'https://api.fda.gov/food/enforcement.json?search=classification.exact:"Class+I"+AND+status:"ongoing"&sort=report_date:desc&limit=500'
			);
			setData(res.data.results);
			setFilteredData(res.data.results);
			setLoading(false);
		};
		fetchPosts();
	}, []);

	const handleChange = nextValue => {
		console.log(nextValue);
		const result = data.filter(data =>
			data.distribution_pattern.includes(nextValue)
		);
		setFilteredData(result);
	};

	const PER_PAGE = filteredData.length >= 16 ? 16 : filteredData.length;
	const offset = currentPage * PER_PAGE;
	const currentPosts = () => {
		if (value && filteredData.length <= 16) {
			return filteredData;
		} else if (value && filteredData.length >= 16) {
			return filteredData.slice(offset, offset + PER_PAGE);
		} else {
			return data.slice(offset, offset + PER_PAGE);
		}
	};

	const pageCount = value
		? Math.ceil(filteredData.length / PER_PAGE)
		: Math.ceil(data.length / PER_PAGE);
	const stateOptions = [
		{
			label: 'AZ',
			value: 'AZ',
		},
		{
			label: 'AR',
			value: 'AR',
		},
		{
			label: 'CA',
			value: 'CA',
		},
		{
			label: 'CO',
			value: 'CO',
		},
		{
			label: 'CT',
			value: 'CT',
		},
		{
			label: 'DE',
			value: 'DE',
		},
		{
			label: 'DC',
			value: 'DC',
		},
		{
			label: 'FL',
			value: 'FL',
		},
		{
			label: 'GA',
			value: 'GA',
		},
		{
			label: 'HI',
			value: 'HI',
		},
		{
			label: 'ID',
			value: 'ID',
		},
		{
			label: 'IL',
			valuue: 'IL',
		},
		{
			label: 'IN',
			value: 'IN',
		},
		{
			label: 'IA',
			value: 'IA',
		},
		{
			label: 'KS',
			value: 'KS',
		},
		{
			label: 'KY',
			value: 'KY',
		},
		{
			label: 'LA',
			value: 'LA',
		},
		{
			label: 'ME',
			value: 'ME',
		},
		{
			label: 'MD',
			value: 'MD',
		},
		{
			label: 'MA',
			value: 'MA',
		},
		{
			label: 'MI',
			value: 'MI',
		},
		{
			label: 'MN',
			value: 'MN',
		},
		{
			label: 'MS',
			value: 'MS',
		},
		{
			label: 'MO',
			value: 'MO',
		},
		{
			label: 'MT',
			value: 'MT',
		},
		{
			label: 'NE',
			value: 'NE',
		},
		{
			label: 'NV',
			value: 'NV',
		},
		{
			label: 'NH',
			value: 'NH',
		},
		{
			label: 'NJ',
			value: 'NJ',
		},
		{
			label: 'NM',
			value: 'NM',
		},
		{
			label: 'NY',
			value: 'NY',
		},
		{
			label: 'NC',
			value: 'NC',
		},
		{
			label: 'ND',
			value: 'ND',
		},
		{
			label: 'OH',
			value: 'OH',
		},
		{
			label: 'OK',
			value: 'OK',
		},
		{
			label: 'OR',
			value: 'OR',
		},
		{
			label: 'PA',
			value: 'PA',
		},
		{
			label: 'PR',
			value: 'PR',
		},
		{
			label: 'RI',
			value: 'RI',
		},
		{
			label: 'SC',
			value: 'SC',
		},
		{
			label: 'SD',
			value: 'SD',
		},
		{
			label: 'TN',
			value: 'TN',
		},
		{
			label: 'TX',
			value: 'TX',
		},
		{
			label: 'UT',
			value: 'UT',
		},
		{
			label: 'VT',
			value: 'VT',
		},
		{
			label: 'WA',
			value: 'WA',
		},
		{
			label: 'WV',
			value: 'WV',
		},
		{
			label: 'WI',
			value: 'WI',
		},
		{
			label: 'WY',
			value: 'WY',
		},
	];

	return (
		<Grommet theme={theme}>
			<Header
				fill='horizontal'
				justify='center'
				background='#717BD9'
				height='xsmall'
				responsive='true'
			>
				<Heading
					className='Heading'
					margin={{ left: '50px' }}
					size='medium'
					color='white'
				>
					Dirty Food
				</Heading>
				<Select
					margin={{ left: 'auto', right: '25px' }}
					id='select'
					name='select'
					placeholder='Filter'
					labelKey='label'
					valueKey={{ key: 'value', reduce: true }}
					value={value}
					options={stateOptions}
					onChange={({ value: nextValue }) => {
						setValue(nextValue);
						handleChange(nextValue);
					}}
				/>
			</Header>

			<Box fill='horizontal' align='center'>
				{pageCount.length === 0 ? (
					<Heading margin='large'>No Data</Heading>
				) : (
					<Posts posts={currentPosts()} loading={loading} />
				)}
			</Box>

			<Box justify='center' pad='medium' responsive={true}>
				<ReactPaginate
					previousLabel={window.innerWidth > 600 ? '← Previous' : '← '}
					nextLabel={window.innerWidth > 600 ? 'Next →' : '→'}
					previousClassName='previous'
					nextClassName='next'
					pageCount={pageCount}
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
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
