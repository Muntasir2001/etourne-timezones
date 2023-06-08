import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import React, {
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import styled from '@emotion/styled';
import moment from 'moment-timezone';
import { SSRConfig } from 'next-i18next';

import {
	getSortedNormalizedTimezoneNames,
	getTimezoneValue,
} from '../utilities/timezone';

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

interface IndexPageProps {
	tzNames: string[];
}

export default function Home({ tzNames }) {
	const timezoneNames = useMemo(
		() => tzNames.map((timezone: string) => getTimezoneValue(timezone)),
		[tzNames],
	);

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
					{timezoneNames.map(
						(tz: { value: string; label: string }, index: number) => (
							<p key={index} className='timezone'>
								{tz.label}
							</p>
						),
					)}
				</div>
			</Parent>
		</>
	);
}

export const getStaticProps: GetStaticProps<
	IndexPageProps & SSRConfig
> = async ({ locale, params }) => {
	const timestamp = params?.timestamp;
	let initialTimestamp: number | null = null;
	if (typeof timestamp === 'string') {
		const timestampNumber = parseInt(timestamp, 10);
		if (!isNaN(timestampNumber) && isFinite(timestampNumber)) {
			initialTimestamp = timestampNumber;
		}
	}
	return {
		props: {
			initialTimestamp,
			tzNames: getSortedNormalizedTimezoneNames(),
		},
	};
};
