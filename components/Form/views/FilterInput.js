import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { withTheme } from 'styled-components';
import Icon from 'components/Icon';

import Input from '../types/Input';

class FilterInput extends Component {
    static displayName = 'FilterInput';

    static defaultProps = {
        inputProps: {},
        iconProps: {
            // We can't access the theme from here so we will handle the default
            // in the component above
            stroke: false,
            width: 1.5,
        },
        id: undefined,
    };

    static propTypes = {
        theme: PropTypes.object.isRequired,
        inputProps: PropTypes.object,
        iconProps: PropTypes.object,
        handleFilter: PropTypes.func.isRequired,
        id: PropTypes.string,
    };

    constructor(props) {
        super(props);
        // Have to put the debounce function in the constructor to get this
        // to work correctly because of react event pooling
        this.onInputChange = debounce(this.props.handleFilter, 200);
    }

    state = {
        filterString: '',
    };

    setFilterString = filterString => {
        this.setState({ filterString });
    };

    render() {
        const { id, iconProps, inputProps, theme, handleFilter } = this.props;
        return (
            <Input
                id={id}
                renderInlineIcon={
                    <Icon
                        type="search"
                        {...iconProps}
                        stroke={
                            iconProps.stroke ? iconProps.stroke : theme.cbcs[4]
                        }
                        width={1.5}
                    />
                }
                {...inputProps}
                value={this.state.filterString}
                onChange={e => {
                    const value = e.target.value;
                    this.setFilterString(value);
                    this.onInputChange(value);
                }}
                onFocus={() => {
                    handleFilter(this.state.filterString);
                }}
            />
        );
    }
}

FilterInput.displayName = 'FilterInput';

export default withTheme(FilterInput);
