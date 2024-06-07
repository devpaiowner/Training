import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import Script from "next/script";
import i18nextConfig from "../../next-i18next.config";
type Props = DocumentProps & {};
export default class MyDocument extends Document<Props> {
    render() {
        const currentLocale =
            this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
        return (
            <Html lang={currentLocale}>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                        rel="stylesheet"
                    />
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                    #__next{
                        display: none;
                    }
                    #pageLoader {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        border: 9px solid;
                        border-color: white;
                        border-right-color: #2a677a;
                        animation: spinner-d3wgkg 1s infinite linear;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        z-index: 1;
                        margin: -76px 0 0 -76px;
                     }
                     
                     @keyframes spinner-d3wgkg {
                        to {
                           transform: rotate(1turn);
                        }
                     }
                 `,
                        }}
                    ></style>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.addEventListener("load", (event) => {
                            document.getElementById("pageLoader").style.display = "none";
                            document.getElementById("__next").style.display = "block";
                        });
                    `,
                        }}
                    ></script>
                </Head>
                <body>
                    <div id="pageLoader"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
