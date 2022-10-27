import Head from 'next/head';
import Image from 'next/image';

import styled from '@emotion/styled';
import moment from 'moment-timezone';

const Parent = styled.div`
	padding: 50px 200px;
	color: var(--white-color);

	.notices {
		margin: 20px 0;
	}

	p {
		font-size: var(--normal-font-size);
		line-height: 30px;
	}

	.timezones {
		margin: 40px 0;
	}
`;

export default function Home() {
	return (
		<>
			<Head>
				<title>Etourne timezones</title>
			</Head>
			<Parent>
				<h1 className='title'>Timezones</h1>

				<div className='notices'>
					<p>Timezones supported by Etourne.</p>
					<p>Use CTRL + F to search for timezones.</p>
				</div>

				<div className='timezones'>
					{moment.tz.names().map((tz, index) => (
						<p key={index} className='timezone'>
							{tz}
						</p>
					))}
				</div>
			</Parent>
		</>
	);
}
