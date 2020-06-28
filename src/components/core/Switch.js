import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Switch as MdcSwitch} from '@rmwc/switch';

import getClassName from 'tools/getClassName';

import './Switch.scss';

export default function Switch({
    className,
    fullWidth,
    inputClassName,
    inputRef,
    label,
    name,
    onChange,
    rootProps,
    value,
    ...props
}) {
    const [inputValue, setInputValue] = useState(value);
    const [rootClassName] = getClassName({
        className,
        modifiers: {
            'full-width': fullWidth,
        },
        rootClass: 'footer',
    });

    function handleChange(event) {
        setInputValue(event.target.value);
        onChange(event);
    }

    return (
        <MdcSwitch
            {...props}
            className={rootClassName}
            inputRef={inputRef}
            label={label}
            name={name}
            onChange={handleChange}
            value={inputValue}
        />
    );
}

Switch.propTypes = {
    className: PropTypes.string,
    /**
        Sets the textfield to use the fullWidth which is preferred in most cases so
        the layout controls the size of the fields.
    */
    fullWidth: PropTypes.bool,
    /** The className that will be on the input if needed. */
    inputClassName: PropTypes.string,
    /** This is a prop that will be passed to the ref prop of the <input /> element*/
    inputRef: PropTypes.func,
    /**
        Creates a label element for the input. It's recommended to use this prop to show
        the special label made for the Switch component.
    */
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    /** By default, props spread to the input. These props are for the component's root container. */
    rootProps: PropTypes.object,
    value: PropTypes.string,
};

Switch.defaultProps = {
    fullWidth: true,
    onChange: () => null,
    rootProps: {},
    value: '',
};
