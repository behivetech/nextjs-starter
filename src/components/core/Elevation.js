import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {range} from 'lodash';

import {Elevation as MdcElevation} from '@rmwc/elevation';

import getClassName from 'tools/getClassName';

import './Elevation.scss';

export default function Elevation({alwaysOn, children, className, transition, z}) {
    const [elevation, setElevation] = useState(alwaysOn ? z : 0);
    const [rootClassName] = getClassName({className, rootClass: 'elevation'});

    function handleMouseOver() {
        if (!alwaysOn) {
            setElevation(z);
        }
    }

    function handleMouseOut() {
        if (!alwaysOn) {
            setElevation(0);
        }
    }

    return (
        <MdcElevation
            className={rootClassName}
            onBlur={handleMouseOut}
            onFocus={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            transition={transition}
            z={elevation}
        >
            {children}
        </MdcElevation>
    );
}

Elevation.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    /** Keeps the elevation always on and ignores mouse events */
    alwaysOn: PropTypes.bool,
    /** Allows for smooth transitions between elevations when the z value changes. */
    transition: PropTypes.bool,
    /** A number from 0 - 24 for different levels of elevation */
    z: PropTypes.oneOf(range(1, 24)),
};

Elevation.defaultProps = {
    alwaysOn: false,
    transition: true,
    z: 3,
};
