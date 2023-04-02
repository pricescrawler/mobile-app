package io.github.pricescrawler.mobile;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;

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