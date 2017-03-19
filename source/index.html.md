---
title: API Reference


toc_footers:
  - <a style="cursor:pointer"id="sign-up">Sign Up for a Developer Key</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>


includes:

search: true
---

# Introduction

Welcome to the Bible API! You can use our API to access restFUL API endpoints, which can get information on various Books, Chapters, and verses in our database.


# Authorization

In order to use this api, you will need to get a developer key. Click the link at the bottom of the nav bar to sign up for a developer key
### Usage
Use the `?auth=` parameter like the following

`http://api.madisonehlers.com/bible/<endpoint>?auth=<your_api_key>`


# Bible Versions

>Response will be a json array in the following format.

### HTTP Request

Get a listing of all of the Available Versions.

`GET http://api.madisonehlers.com/bible/versions`

Response is `json array`. View example to the right.

```json
[
  {
    "id": "001",
    "table": "t_asv",
    "abbreviation": "ASV",
    "language": "english",
    "version": "American Standard-ASV1901",
    "info_text": "",
    "info_url": "http://en.wikipedia.org/wiki/American_Standard_Version",
    "publisher": "",
    "copyright": "Public Domain",
    "copyright_info": ""
  },
  {
    "id": "002",
    "table": "t_bbe",
    "abbreviation": "BBE",
    "language": "english",
    "version": "Bible in Basic English",
    "info_text": "",
    "info_url": "http://en.wikipedia.org/wiki/Bible_in_Basic_English",
    "publisher": "",
    "copyright": "Public Domain",
    "copyright_info": ""
  }
]
```
### Version Keys

Translation | Key | Info
--------- | ------- | -----------
American Standard | ASV | [ASV Wiki](http://en.wikipedia.org/wiki/American_Standard_Version)
Bible in Basic English | BBE | [BBE Wiki](http://en.wikipedia.org/wiki/Bible_in_Basic_English)
Darby English Bible | DARBY | [DARBY Wiki](http://en.wikipedia.org/wiki/Darby_Bible)
King James Version | KJV | [KJV Wiki](http://en.wikipedia.org/wiki/King_James_Version)
Webster's Bible | WBT | [WBT Wiki](http://en.wikipedia.org/wiki/Webster%27s_Revision)
World English Bible | WEB | [WEB Wiki](http://en.wikipedia.org/wiki/World_English_Bible)
Young's Literal Translation | YLT | [YLT Wiki](http://en.wikipedia.org/wiki/Young%27s_Literal_Translation)
English Standard Version | ESV | [ESV Wiki](https://en.wikipedia.org/wiki/English_Standard_Version)


<aside class="success">
Initial release has only 8 versions of the Bible available, as seen above.
</aside>

# Books in the Bible

> Response


###HTTP Request

Get a listing of all of the Available Versions.

`GET http://api.madisonehlers.com/bible/books`

Response is `json array`. View example to the right.

Use this response to get the book_id, book abbreviation, title, genre and which part of the Bible the book is in.


```json
[
  {
    "abbreviation": "Gen",
    "book_id": "1",
    "title": "Genesis",
    "genre": "Law",
    "testament": "OT"
  },
  {
    "abbreviation": "Exo",
    "book_id": "2",
    "title": "Exodus",
    "genre": "Law",
    "testament": "OT"
  }
]
```


### Main Genres in the Bible
Genre | Description
--------- | -----------
Law | Originally referred to as the [Torah](https://en.wikipedia.org/wiki/Torah)
History | These books focus more on Historical events
Wisdom | Find more info [here](https://en.wikipedia.org/wiki/Wisdom_literature)
Prophets | Minor and Major prophets [More](https://en.wikipedia.org/wiki/Nevi%27im)
Gospels | Gospel means "Good News". Refers to [Jesus' life.](https://en.wikipedia.org/wiki/Gospel)
Acts | This genre could also just be in History
Epistles | Paul's letters to the early churches. [More](https://en.wikipedia.org/wiki/Epistle)
Apocalyptic | Referring to [end times](https://en.wikipedia.org/wiki/Book_of_Revelation)

# Get Book Metadata

### HTTP Request
To get the metadata about each book in the bible, use this endpoint. It will return the number of
total verses in the book, the total number of chapters, the genre, the name, and if it is the new or old testament.

`GET http://api.madisonehlers.com/bible/book/metadata/<book_id>`

<aside class="success">
Note that you are able to send the book_id, but if you send the abbreviation, such as Gen (case insensitive),
You will also get the same results from sending book/gen as book/1
</aside>
```json
[{
    "number_verses": "105",
    "book_id": "33",
    "number_chapters": "7",
    "title": "Micah",
    "testament": "OT",
    "genre": "Prophets"
}]
```

# Get Each Book of the Bible


###HTTP Request
If you're looking to get each book, this will return an entire book in the Bible as a json array of verses.

`GET http://api.madisonehlers.com/bible/<version>/book/<book_id>`
Use this endpoint to return
> The above command returns JSON structured like this:

<aside class="success">
Note that you are able to send the book_id, but if you send the abbreviation, such as Gen (case insensitive),
You will also get the same results from sending book/gen as book/1
</aside>
```json
[ {
        "verse_id":"01001001",
        "book_id":"1",
        "chapter":"1",
        "verse":"1",
        "text":"In the beginning God created the heavens and the earth."
     },
     {
        "verse_id":"01001002",
        "book_id":"1",
        "chapter":"1",
        "verse":"2",
        "text":"And the earth was waste and void; and darkness was upon the face of the deep: and the Spirit of God moved upon the face of the waters."
     },
     {
        "verse_id":"01001003",
        "book_id":"1",
        "chapter":"1",
        "verse":"3",
        "text":"And God said, Let there be light: and there was light."
     }]
```


# Get Chapter Metadata

### HTTP Request
To get the metadata about each chapter in the bible, use this endpoint. It will return the number of
total verses in the chapter, the genre, the name of the book, and if it is the new or old testament.

`GET http://api.madisonehlers.com/bible/chapter/metadata/<book_id>/<chapter_id>`


<aside class="success">
Note that you are able to send the book_id, but if you send the abbreviation, such as Gen (case insensitive),
You will also get the same results from sending book/gen as book/1,  and that the chapter id is the logical chapter in the bible
</aside>
```json
[{
    "number_verses": "31",
    "book_id": "1",
    "chapter_id": "1",
    "title": "Genesis",
    "testament": "OT",
    "genre": "Law"
}]
```
# Get Individual Chapters

`GET http://api.madisonehlers.com/bible/<version>/book/<book_id>/chapter/<chapter>`

This endpoint will return the same data type as returning the entire book, but you will have less to parse.
(I imagine this endpoint is less useful than getting the entire book)

<aside class="success">
Note that you are able to send the book_id, but if you send the abbreviation, such as Gen (case insensitive),
You will also get the same results from sending book/gen as book/1
</aside>

>The result of doing `http://api.madisonehlers.com/bible/t_asv/book/33/chapter/1`

```json
[
    {
    "verse_id":"33001001",
    "book_id":"33",
    "chapter":"1",
    "verse":"1",
    "text":"The word of Jehovah that came to Micah the Morashtite in the days of Jotham, Ahaz, and Hezekiah, kings of Judah, which he saw concerning Samaria and Jerusalem."
    }

]
```

# Get Individual Verses

> Response for individual verses

```json

[
   {
      "verse_id":"40001010",
      "book_id":"40",
      "chapter":"1",
      "verse":"10",
      "text":"and Hezekiah begat Manasseh; and Manasseh begat Amon; and Amon begat Josiah;",
      "x_ref":[
         {
            "start_verse":"24001002",
            "end_verse":"24001003",
            "rank":"2"
         },
         {
            "start_verse":"13003013",
            "end_verse":"13003015",
            "rank":"2"
         },
         {
            "start_verse":"14032033",
            "end_verse":"14035027",
            "rank":"2"
         }
      ]
   }
]
```

Using either http request will return the same data json structure.

Each verse will return the book number, chapter, and verse. As well as another json array on key `x_ref` that has a list of all of the
cross references associated with that verse. Some verses cross references a passage of verses, and so it is assumed that you will
need to get all of the verses (Verse id's should be in order) inclusively from the start_verse to end_verse. The end verse will be
0 if there is only one verse `(the verse id in start_verse)`

`GET http://api.madisonehlers.com/bible/<version>/verse/<verse_id>`



`GET http://api.madisonehlers.com/bible/<version>/book/<Chapter ID OR Abbreviation>/chapter/<Chapter Number>/verse/<Verse Number>`



### Example

    Returns Matthew 5:10 from the ASV version.

    `http://api.madisonehlers.com/bible/t_asv/book/Matt/chapter/1/verse/10`

    Would yield the same results as

    `http://api.madisonehlers.com/bible/t_asv/verse/40001010`

    Where 40001010 is the verse id.

