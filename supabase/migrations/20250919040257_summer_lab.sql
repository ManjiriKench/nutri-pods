/*
  # NutriPods Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `family_size` (integer)
      - `default_budget` (decimal)
      - `currency` (text, default 'INR')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `saved_meal_plans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `plan_name` (text)
      - `family_members` (jsonb)
      - `weekly_budget` (decimal)
      - `food_prices` (jsonb)
      - `shopping_list` (jsonb)
      - `meal_plans` (jsonb)
      - `nutrition_coverage` (jsonb)
      - `total_budget_used` (decimal)
      - `budget_tips` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_food_prices`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `food_id` (text)
      - `food_name` (text)
      - `price_per_unit` (decimal)
      - `unit` (text)
      - `last_updated` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Ensure data privacy and security
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  family_size integer DEFAULT 1,
  default_budget decimal(10,2) DEFAULT 500.00,
  currency text DEFAULT 'INR',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saved_meal_plans table
CREATE TABLE IF NOT EXISTS saved_meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  plan_name text NOT NULL,
  family_members jsonb NOT NULL,
  weekly_budget decimal(10,2) NOT NULL,
  food_prices jsonb NOT NULL,
  shopping_list jsonb NOT NULL,
  meal_plans jsonb NOT NULL,
  nutrition_coverage jsonb NOT NULL,
  total_budget_used decimal(10,2) NOT NULL,
  budget_tips jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_food_prices table
CREATE TABLE IF NOT EXISTS user_food_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  food_id text NOT NULL,
  food_name text NOT NULL,
  price_per_unit decimal(10,2) NOT NULL,
  unit text NOT NULL,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id, food_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_food_prices ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for saved_meal_plans
CREATE POLICY "Users can read own meal plans"
  ON saved_meal_plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meal plans"
  ON saved_meal_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meal plans"
  ON saved_meal_plans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own meal plans"
  ON saved_meal_plans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for user_food_prices
CREATE POLICY "Users can read own food prices"
  ON user_food_prices
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own food prices"
  ON user_food_prices
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own food prices"
  ON user_food_prices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own food prices"
  ON user_food_prices
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to automatically create user profile
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_saved_meal_plans_updated_at
  BEFORE UPDATE ON saved_meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_food_prices_updated_at
  BEFORE UPDATE ON user_food_prices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();