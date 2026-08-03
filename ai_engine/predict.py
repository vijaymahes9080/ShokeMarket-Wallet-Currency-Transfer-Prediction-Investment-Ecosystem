import json
import random
import datetime

def generate_shoke_ai_predictions():
    assets = [
        {"asset": "USD/INR", "category": "Forex", "base_price": 83.45},
        {"asset": "EUR/USD", "category": "Forex", "base_price": 1.087},
        {"asset": "BTC/USD", "category": "Crypto", "base_price": 66420.0},
        {"asset": "NVDA", "category": "Stock", "base_price": 129.80}
    ]

    predictions = []
    for item in assets:
        confidence = random.randint(85, 96)
        direction = "UP" if random.random() > 0.3 else "DOWN"
        change_pct = round(random.uniform(0.4, 3.5), 2)
        signal = "STRONG BUY" if direction == "UP" and confidence > 90 else "BUY" if direction == "UP" else "SELL"

        predictions.append({
            "asset": item["asset"],
            "category": item["category"],
            "direction": direction,
            "change_percent": f"{'+' if direction == 'UP' else '-'}{change_pct}%",
            "confidence": confidence,
            "sentiment_score": random.randint(75, 95) if direction == "UP" else random.randint(25, 45),
            "signal": signal,
            "model_timestamp": datetime.datetime.utcnow().isoformat()
        })

    return json.dumps(predictions, indent=2)

if __name__ == "__main__":
    print(generate_shoke_ai_predictions())
