package io.github.pricescrawler.mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import io.github.pricescrawler.mobile.BuildConfig;
import io.github.pricescrawler.mobile.R;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //hides top bar
        getSupportActionBar().hide();

        WebView webview = findViewById(R.id.webview);
        WebSettings webSettings = webview.getSettings();
        //Enables javascript
        webSettings.setJavaScriptEnabled(true);
        //Will enable local storage
        webSettings.setDomStorageEnabled(true);

        webview.loadUrl(BuildConfig.SERVER_URL);
    }
}