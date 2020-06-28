import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import {TextField as MdcTextField} from '@rmwc/textfield';
import FieldError from './FieldError';

import './TextField.scss';

export default function TextField({
    className,
    fieldError,
    fullWidth,
    inputClassName,
    inputRef,
    label,
    name,
    onChange,
    rootProps,
    textarea,
    value,
    ...props
}) {
    function handleChange(event) {
        onChange(event);
    }

    const [rootClassName] = getClassName({
        className,
        modifiers: {
            'full-width': fullWidth,
            textarea,
        },
        rootClass: 'text-field',
    });

    return (
        <React.Fragment>
            <MdcTextField
                {...props}
                aria-invalid={!!fieldError}
                className={rootClassName}
                inputRef={inputRef}
                invalid={!!fieldError}
                label={label}
                name={name}
                onChange={handleChange}
                rootProps={rootProps}
                textarea={textarea}
            />
            <FieldError error={fieldError} />
        </React.Fragment>
    );
}

TextField.propTypes = {
    className: PropTypes.string,
    /** Error to be shown with the field from validation */
    fieldError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
        the special label made for the TextField component.
    */
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    /** By default, props spread to the input. These props are for the component's root container. */
    rootProps: PropTypes.object,
    /** Changes the input element to a textarea element */
    textarea: PropTypes.bool,
    value: PropTypes.string,
};

TextField.defaultProps = {
    fullWidth: true,
    onChange: () => null,
    rootProps: {},
    value: '',
};
