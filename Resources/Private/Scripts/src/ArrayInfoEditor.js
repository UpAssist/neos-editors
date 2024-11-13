import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import {neos} from '@neos-project/neos-ui-decorators';

@neos(globalRegistry => ({
	i18nRegistry: globalRegistry.get('i18n')
}))

export default class ArrayInfoEditor extends PureComponent {

	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.array]),
		options: PropTypes.object,
		i18nRegistry: PropTypes.object.isRequired
	};

	static defaultOptions = {
		readonly: true,
		placeholder: '',
	};

	isHtml = (string) => /<\/?[a-z][\s\S]*>/i.test(string);

	render() {
		const {value, options, i18nRegistry} = this.props;
		const finalOptions = Object.assign({}, this.constructor.defaultOptions, options);
		const placeholder = finalOptions.placeholder && i18nRegistry.translate(unescape(finalOptions.placeholder));

		return (
			<ul className={styles.ArrayInfoEditor}>
				{value.length === 0 && (
					<li className={styles.ArrayInfoEditor__item}>
						<div role="button"
								 className={styles.ArrayInfoEditor__content}>{placeholder !== 'i18n' ? placeholder : 'No values'}</div>
					</li>
				)}

				{value && Object.entries(value).map(([key, val]) => (
					<li key={key} className={styles.ArrayInfoEditor__item}>
						<div className={styles.ArrayInfoEditor__title}>{key}</div>
						<div role="button" className={styles.ArrayInfoEditor__content}>
							{this.isHtml(val) ? (
								<span dangerouslySetInnerHTML={{__html: val}}/>
							) : (
								val
							)}
						</div>
					</li>
				))}
			</ul>
		)
	}
}
