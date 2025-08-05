// utils/NavigationClient.js
import { NavigationClient } from "@azure/msal-browser";

/**
 * This is an example for overriding the default function MSAL uses to navigate between pages in your app.
 * Being able to override this is useful if you're using a router library like react-router, because it allows 
 * you to navigate without causing the browser to refresh the page.
 * 
 * More information about this can be found here: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/navigation.md
 */
export class CustomNavigationClient extends NavigationClient {
    constructor(navigate) {
        super();
        this.navigate = navigate;
    }

    /**
     * Navigates to other pages within the same web application
     * You can use the useNavigate hook provided by react-router-dom to take advantage of client-side routing
     * @param url 
     * @param options 
     */
    async navigateInternal(url, options) {
        const relativePath = url.replace(window.location.origin, "");
        if (options.noHistory) {
            this.navigate(relativePath, { replace: true });
        } else {
            this.navigate(relativePath);
        }

        return false;
    }
}