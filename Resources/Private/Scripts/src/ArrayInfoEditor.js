import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import {neos} from '@neos-project/neos-ui-decorators';

// Placeholders that come from the Neos defaults of the `array` data type (meant for the
// SelectBoxEditor) instead of from the property configuration.
const INHERITED_PLACEHOLDERS = ['', 'i18n', 'Choose'];

const isObjectLike = value => value !== null && typeof value === 'object';
const isEmpty = value => value === null || value === undefined || value === '' || (isObjectLike(value) && Object.keys(value).length === 0);
const isHtml = value => typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value);

@neos(globalRegistry => ({
	i18nRegistry: globalRegistry.get('i18n')
}))

export default class ArrayInfoEditor extends PureComponent {

	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		options: PropTypes.object,
		i18nRegistry: PropTypes.object.isRequired
	};

	static defaultOptions = {
		readonly: true,
		placeholder: '',
	};

	renderValue(value) {
		if (isObjectLike(value)) {
			return this.renderList(value, true);
		}
		if (typeof value === 'boolean') {
			return value ? 'true' : 'false';
		}
		if (value === null || value === undefined) {
			return '';
		}
		if (isHtml(value)) {
			return <span dangerouslySetInnerHTML={{__html: value}}/>;
		}
		return String(value);
	}

	renderList(value, nested) {
		const className = nested ? `${styles.ArrayInfoEditor} ${styles['ArrayInfoEditor--nested']}` : styles.ArrayInfoEditor;
		const entries = isObjectLike(value) ? Object.entries(value) : [['', value]];

		return (
			<ul className={className}>
				{entries.map(([key, val]) => (
					<li key={key} className={styles.ArrayInfoEditor__item}>
						{key !== '' && <div className={styles.ArrayInfoEditor__title}>{key}</div>}
						<div role="button" className={styles.ArrayInfoEditor__content}>
							{this.renderValue(val)}
						</div>
					</li>
				))}
			</ul>
		);
	}

	render() {
		const {value, options, i18nRegistry} = this.props;
		const finalOptions = Object.assign({}, this.constructor.defaultOptions, options);
		const configuredPlaceholder = typeof finalOptions.placeholder === 'string' ? finalOptions.placeholder : '';
		const placeholder = INHERITED_PLACEHOLDERS.includes(configuredPlaceholder)
			? 'No values'
			: i18nRegistry.translate(unescape(configuredPlaceholder));

		if (isEmpty(value)) {
			return (
				<ul className={styles.ArrayInfoEditor}>
					<li className={styles.ArrayInfoEditor__item}>
						<div role="button" className={styles.ArrayInfoEditor__content}>{placeholder}</div>
					</li>
				</ul>
			);
		}

		return this.renderList(value, false);
	}
}
