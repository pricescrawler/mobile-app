package io.github.pricescrawler.mobile;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();

        if (isNetworkAvailable()) {
            showWebView();
        } else {
            showNoInternetLayout();
        }
    }

    private void showWebView() {
        setContentView(R.layout.activity_main);

        WebView webview = findViewById(R.id.webview);
        WebSettings webSettings = webview.getSettings();

        // Enables JavaScript
        webSettings.setJavaScriptEnabled(true);
        // Enables local storage
        webSettings.setDomStorageEnabled(true);
        webview.loadUrl(BuildConfig.SERVER_URL);
    }

    private void showNoInternetLayout() {
        setContentView(R.layout.no_internet_layout);
        Button refreshButton = findViewById(R.id.refreshButton);

        // Set up the refresh button click listener
        refreshButton.setOnClickListener(view -> {
            if (isNetworkAvailable()) {
                showWebView();
            } else {
                Toast.makeText(MainActivity.this, "Still no internet access", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onBackPressed() {
        WebView webview = findViewById(R.id.webview);

        if (webview.canGoBack()) {
            webview.goBack();
        } else {
            super.onBackPressed();
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        if (connectivityManager != null) {
            NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
            return activeNetworkInfo != null && activeNetworkInfo.isConnected();
        }

        return false;
    }
}
