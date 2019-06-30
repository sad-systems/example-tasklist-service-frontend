/**
 * Project main style & color theme
 *
 * Use to customize: https://material-ui.com/customization/color/
 *                   https://react-theming.github.io/create-mui-theme/
 *
 * @return object
 */

import { createMuiTheme } from '@material-ui/core/styles';
import blue      from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';

export default createMuiTheme({
    // --- Color palette: (https://material-ui.com/customization/palette/#palette)
    palette: {
        primary:   blue,
        secondary: lightBlue,
        text: {
            primary:   '#000',
            secondary: '#1d3448',
        },
    },
    // --- Component defaults: (https://material-ui.com/customization/globals/#default-props)
    props: {
    },
    // --- Component overrides: (https://material-ui.com/customization/globals/#css)
    overrides: {
        MuiButton:{
            text:{
                // border: "1px solid",
            }
        },
    },
    // --- Mixins: (common parts)
    mixins: {
        borderSimplifier: {
            boxShadow: "none",
            borderRadius: 0,
        }
    },
});