# /links — link-in-bio

`https://www.therecruitingcompass.com/links` is the one link every social profile
points to. It lists the App Store, web signup, the free grades 9–12 timeline PDF,
the monthly recruiting-dates email and the home page. iPhone and iPad visitors
see the App Store first; everyone else sees web signup first.

## Bio URLs (paste one per profile)

| Profile   | URL                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Instagram | `https://www.therecruitingcompass.com/links?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Facebook  | `https://www.therecruitingcompass.com/links?utm_source=facebook&utm_medium=social&utm_campaign=bio`  |
| TikTok    | `https://www.therecruitingcompass.com/links?utm_source=tiktok&utm_medium=social&utm_campaign=bio`    |
| X         | `https://www.therecruitingcompass.com/links?utm_source=x&utm_medium=social&utm_campaign=bio`         |
| YouTube   | `https://www.therecruitingcompass.com/links?utm_source=youtube&utm_medium=social&utm_campaign=bio`   |
| Threads   | `https://www.therecruitingcompass.com/links?utm_source=threads&utm_medium=social&utm_campaign=bio`   |

For a single post or story link, keep the source and change the campaign, for
example `utm_campaign=c4-first-email`.

## Where the numbers show up

- **Visits**: PostHog → Web analytics, filtered to `/links`, broken down by UTM source.
- **Web signups**: the signup link keeps the visitor's `utm_source`, `utm_medium`
  and `utm_campaign`, and adds `utm_content=links`.
- **iPhone installs**: App Store Connect → App Analytics → Acquisition → Campaigns.
  The campaign is `links-<utm_source>` (for example `links-instagram`). Apple shows
  a campaign once it has 5 or more downloads.
- **Clicks**: PostHog event `landing_cta_clicked` with `placement` = the
  `utm_content`/`ct` value above.

Set `APP_STORE_PROVIDER_TOKEN` in `data/site.ts` (the `pt` value from any
campaign link App Store Connect generates) so App Store links are attributed.
