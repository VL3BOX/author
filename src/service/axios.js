import {
    $https,
    $_https,
    $next,
    $helper,
} from "@jx3box/jx3box-common/js/https.js";
const $server = $https("server", {
    proxy: false,
});
export { $helper, $server, $next };
