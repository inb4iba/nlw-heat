defmodule HeatTags.Emails.Get do
  import Ecto.Query

  alias HeatTags.{Message, Repo}

  def today_emails do
    query = from(message in Message, select: [:email])

    Repo.all(query)
    |> Enum.map(&Map.take(&1, [:email]))
    |> Enum.uniq()
    |> Enum.map(fn email -> email.email end)
  end
end
