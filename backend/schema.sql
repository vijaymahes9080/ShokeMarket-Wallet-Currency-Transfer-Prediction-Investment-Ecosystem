-- ShokeMarket PostgreSQL Database Schema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    kyc_status VARCHAR(50) DEFAULT 'TIER_1',
    two_factor_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    currency VARCHAR(10) NOT NULL,
    balance NUMERIC(18, 4) DEFAULT 0.0000,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, currency)
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- 'TRANSFER', 'CONVERT', 'DEPOSIT', 'INVESTMENT', 'TRADE'
    source_currency VARCHAR(10) NOT NULL,
    source_amount NUMERIC(18, 4) NOT NULL,
    target_currency VARCHAR(10),
    target_amount NUMERIC(18, 4),
    fee NUMERIC(18, 4) DEFAULT 0.0000,
    status VARCHAR(50) DEFAULT 'COMPLETED',
    reference_code VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    direction VARCHAR(10) NOT NULL, -- 'UP', 'DOWN'
    confidence INTEGER NOT NULL,
    sentiment_score INTEGER NOT NULL,
    signal VARCHAR(50) NOT NULL,
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE startup_investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    startup_name VARCHAR(255) NOT NULL,
    amount_usd NUMERIC(18, 2) NOT NULL,
    equity_percentage NUMERIC(10, 6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
